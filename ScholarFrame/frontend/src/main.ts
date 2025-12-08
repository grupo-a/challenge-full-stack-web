import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' //Import Axios

//Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

//RESTORE TOKEN ON STARTUP
//Checks if there is a token already saved in the browser
const token = localStorage.getItem('user_token');
if (token) {
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

//ERROR INTERCEPTOR

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('user_token'); //Clear the invalid token
      router.push('/login'); //Redirect to login
    }
    return Promise.reject(error);
  }
);

app.use(vuetify)
app.use(router)
app.mount('#app')