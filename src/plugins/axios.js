import axios from 'axios'

axios.defaults.baseURL = 'http://momjobgo.devcury.kr';
// axios.defaults.baseURL = 'http://localhost:8090';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;