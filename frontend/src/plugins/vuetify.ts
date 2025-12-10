import 'vuetify/lib/styles/main.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light'
    }
});
