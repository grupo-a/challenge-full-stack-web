import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#00BCC3', // #E53935
          secondary:'#D32F2F', // #FFCDD2
        }
      },
    },
  },
})
