import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import vuetify from "./vuetify";
import { store } from "./store";

createApp(App).use(vuetify).use(router).use(store).mount("#app");
