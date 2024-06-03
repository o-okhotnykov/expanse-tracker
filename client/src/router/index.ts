import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@@/Dashboard/index.vue";
import History from "@@/History/index.vue";
import Login from "@@/Login/index.vue";
import Register from "@@/Register/index.vue";
import { Paths, PathsNames } from "./paths";

const routes = [
  { path: Paths.default, name: PathsNames.default, redirect: Paths.dashboard },
  { path: Paths.dashboard, name: PathsNames.dashboard, component: MainPage },
  { path: Paths.history, name: PathsNames.history, component: History },
  { path: Paths.login, name: PathsNames.login, component: Login },
  { path: Paths.register, name: PathsNames.register, component: Register },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
