import colors from 'vuetify/es5/util/colors';
import pt from "vuetify/es5/locale/pt";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Alunos',
    title: 'Alunos',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/lodash.js",
    "~plugins/vee-validate",
    "~plugins/vue-the-mask.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "@nuxtjs/dotenv",
    "@nuxtjs/vuetify"
  ],
  toast: {
    position: "top-right",
    register: [
      { name: "error", message: (message) => message, options: { type: "error", duration: 5000 } },
      { name: "success", message: (message) => message, options: { type: "success", duration: 5000 } },
      { name: "info", message: (message) => message, options: { type: "info", duration: 5000 } },
      { name: "warning", message: (message) => message, options: { type: "warning", duration: 5000 } }
    ],
    singleton: true
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  moment: {

    defaultLocale: "pt-br",
    locales: ["pt-br"]

  },
  lang: {
    locales: { pt },
    current: "pt",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.red,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
