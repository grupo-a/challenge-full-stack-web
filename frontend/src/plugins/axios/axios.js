import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL_SERVER;

export default axios