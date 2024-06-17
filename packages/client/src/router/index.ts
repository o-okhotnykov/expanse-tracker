import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@@/Dashboard/index.vue";
import History from "@@/History/index.vue";
import Login from "@@/Login/index.vue";
import Register from "@@/Register/index.vue";
import { Paths, PathsNames } from "./paths";
import { store } from "@/store";

const routes = [
  { path: Paths.default, name: PathsNames.default, redirect: Paths.dashboard },
  {
    path: Paths.dashboard,
    name: PathsNames.dashboard,
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: Paths.history,
    name: PathsNames.history,
    component: History,
    meta: { requiresAuth: true },
  },
  { path: Paths.login, name: PathsNames.login, component: Login },
  { path: Paths.register, name: PathsNames.register, component: Register },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthorize) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
