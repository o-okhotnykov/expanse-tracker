import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import vuetify from "./vuetify";
import { rootStoreKey, rootStore } from "./store";

createApp(App)
  .use(vuetify)
  .use(router)
  .use(rootStore, rootStoreKey)
  .mount("#app");
