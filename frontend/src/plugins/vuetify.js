import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#173144',
        secondary: '#C71D37',
        info: '#01ADB4',
        light: '#74889A',
      },
    },
  },
});
