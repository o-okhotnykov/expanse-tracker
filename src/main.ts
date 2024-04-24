import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import vuetify from "./vuetify";
import { key, store } from "./store";

createApp(App).use(vuetify).use(router).use(store, key).mount("#app");
