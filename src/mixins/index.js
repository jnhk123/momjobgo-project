import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'http://momjobgo.devcury.kr';
axios.defaults.headers.post['Content-Type'] = 'application/json';

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
            }).catch(e => {
                console.error(e);
            })).data;
        }
    }
}