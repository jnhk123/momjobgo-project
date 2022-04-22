<template>
  <v-navigation-drawer app v-if="$store.state.appNavVisible">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">Vue-Project</v-list-item-title>
        <v-list-item-subtitle> {{ $store.state.user.name }}님 환영합니다. </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in menuList" :key="item.title" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Page from "@/utils/Page";

export default {
  data: () => ({
  }),

  computed : {
    ...mapGetters(['hasToken', 'menuList'])
  },

  methods: {
    ...mapActions(["setToken", 'setMenuList']),

    async callMenu(){
      const response = await this.$api('/api/menu','GET',{});
      
      if(response.status === 200){
        const filteredList = response.data.filter(menu => Page[menu.name]) 
        const menuList = filteredList.map(menu => {
          const info = Page[menu.name];
          return {
            title : info.meta.title,
            icon : info.meta.icon,
            to : info.path
          }
        });
        this.setMenuList(menuList);
      } else if(response?.data?.error){
        alert(response.data.error);
      }
    },

    logout() {
      if (confirm("정말로 로그아웃 하시겠습니까?")) {
        this.setToken("");
      }
    },
  },

  watch : {
    'hasToken' : function() {
      if(this.hasToken){
        this.callMenu();
      }
    }
  }

};
</script>
