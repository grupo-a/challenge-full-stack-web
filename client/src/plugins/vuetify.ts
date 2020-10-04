import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "vuetify/src/locale/pt";
import minifyTheme from "minify-css-string";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      minifyTheme,
      themeCache: {
        get: (key: any) => localStorage.getItem(key),
        set: (key: any, value: any) => localStorage.setItem(key, value)
      }
    }
  },
  lang: {
    locales: { pt },
    current: "pt"
  }
});
