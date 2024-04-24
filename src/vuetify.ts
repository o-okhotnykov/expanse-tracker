import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

export default createVuetify({
  icons: {
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
  components,
  directives,
});
