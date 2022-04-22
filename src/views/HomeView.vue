<template>
  <v-container>
    <v-card class="mx-auto" max-width="1400">
      <v-card-title>
        <input style="border: 1px solid;" class="right" type="text" placeholder="검색어를 입력하세요."
          v-model="keyword"
          @keyup.enter="search"
        />
        <v-btn style="margin-left: 8px;" @click="search">검색</v-btn>
        <v-btn style="margin-left: 8px;" @click="moveCurrentLocation">현재 위치로</v-btn>
      </v-card-title>
      <div id="map" style="width: inherit; height: 600px"></div>
    </v-card>
  </v-container>
</template>

<script>
export default {

  data: () => ({
    map: {},

    infowindow : {},

    markerList : [],
 
    keyword : ''

  }),

  components: {},

  mounted() {
    this.$loadKakaoMap(() => {

      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.515,126.983),
        level: 8,
      };

      this.map = new window.kakao.maps.Map(container, options);
    });
  },

  methods: {

    removeAllMarker(){
      this.markerList.forEach(marker => {
        marker.setMap(null);
      });
    },

    moveCurrentLocation(){
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          position => {
            this.map.setCenter(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
          },
          error => {
            if(error.code === 1) alert('위치정보동의를 거부하였습니다.');
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    },

    search(){
      this.removeAllMarker();
      const ps = new kakao.maps.services.Places(); 
      ps.keywordSearch(this.keyword, this.placesSearchCB); 
    },

    placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다    
          const bounds = new kakao.maps.LatLngBounds();

          for (let i=0; i<data.length; i++) {
              this.displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }       

          this.map.setBounds(bounds);
      }
    },

    displayMarker(place) {
      
      
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(place.y, place.x),
      });

      this.markerList.push(marker);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', ()=> {
          this.map.setCenter(new kakao.maps.LatLng(place.y, place.x));
          this.map.setLevel(4);

          if(this.infowindow.close){
            this.infowindow.close();
          }

          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          const template = 
          `<div style="padding:5px;">
            <p>${place.road_address_name}</p>
            <p>이름 : <br/><a href="${place.place_url}" target="_blank">${place.place_name}</a></p>
            <p>전화번호 : <br/>${place.phone}</p>
          </div>`

          this.infowindow = new kakao.maps.InfoWindow({
              content : template,
              removable : true
          });

          this.infowindow.open(this.map, marker);
      });
    }
  },
};
</script>
