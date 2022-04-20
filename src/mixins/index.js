import axios from '@/plugins/axios'
import store from '@/store'

export default {
    methods: {
        async $api(url, method, data) {
            return (await axios({
                headers: {
                    Authorization: `Bearer ${store.state.user.token}`
                },
                method: method
                , url
                , data
            }).catch(e=> {
                return e.response
            })).data;
        }
    }
}