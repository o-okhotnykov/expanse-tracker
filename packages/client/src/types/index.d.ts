import { RootStore } from "../store";
import "vue-router";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: RootStore;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean;
    // must be declared by every route
    requiresAuth: boolean;
  }
}

export {};
