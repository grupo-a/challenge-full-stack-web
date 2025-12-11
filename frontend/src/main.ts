import { createApp } from 'vue';
import App from './App.vue';

import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';
import Toast, { toastOptions } from './plugins/toast';
import router from './router';

import { useAuthStore } from './modules/auth/stores/auth.store';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(Toast, toastOptions);

const authStore = useAuthStore();

authStore.initialize().finally(() => {
    app.mount('#app');
});
