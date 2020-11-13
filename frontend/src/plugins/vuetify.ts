import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const dark = JSON.parse(localStorage.getItem('darkTheme') || 'false');
export default new Vuetify({
  theme: {
    dark,
    themes: {
      light: {
        primary: colors.grey.darken4,
      },
      dark: {
        primary: colors.grey.lighten5,
      },
    },
  },
});
