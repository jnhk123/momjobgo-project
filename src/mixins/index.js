import axios from '@/plugins/axios'
import store from '@/store'

export default {

    data: () => ({
        HTTP_OK: 200
    }),

    methods: {
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
        }
    }
}