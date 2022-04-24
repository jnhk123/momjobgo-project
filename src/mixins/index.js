import axios from '@/plugins/axios'
import store from '@/store'

export default {

    data: () => ({
        HTTP_OK: 200
    }),

    methods: {
        /**
         * @param {*} url 
         * @param {*} method 
         * @param {*} data paramter 
         * @returns 
         */
        async $api(url, method, data) {
            return axios({
                headers: {
                    Authorization: `Bearer ${store.state.user.token}`
                },
                method: method
                , url
                , data
            }).catch(e => {
                return e.response
            });
        },

        $loadKakaoMap(callback) {
            if (typeof kakao === 'undefined') {
                const script = document.createElement('script');
                script.onload = () => kakao.maps.load(callback);
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&autoload=false&libraries=services`;
                document.head.appendChild(script);
            } else {
                callback();
            }
        },

        $nl2br(text){
            return text.replace(/\n/g, "<br />");
        }
    },

    filters : {
        toYmdHms(dateObj){
            const current = new Date();

            const year = String(current.getFullYear());
            const month = String(current.getMonth() + 1).padStart(2,0);
            const date = String(current.getDate()).padStart(2,0);
            const hour = String(current.getHours()).padStart(2,0);
            const minute = String(current.getMinutes()).padStart(2,0);
            const second = String(current.getSeconds()).padStart(2,0);

            return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        },


    }
}