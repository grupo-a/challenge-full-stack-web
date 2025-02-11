import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        primary: "#00BCD4", // Cyan
        secondary: "#0097A7", // Variante de Cyan
        accent: "#00ACC1", // Outro tom de Cyan
        error: "#FF5252", // Cor para erros
        info: "#2196F3", // Cor para informações
        success: "#4CAF50", // Cor para sucesso
        warning: "#FF9800", // Cor para avisos
      },
    },
    defaultTheme: "light",
  },
});
