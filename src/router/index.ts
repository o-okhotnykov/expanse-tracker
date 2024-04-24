import { createMemoryHistory, createRouter } from "vue-router";
import MainPage from "@@/Dashboard/index.vue";
import History from "@@/History/index.vue";
import { Paths, PathsNames } from "./paths";

const routes = [
  { path: Paths.default, name: PathsNames.default, redirect: Paths.dashboard },
  { path: Paths.dashboard, name: PathsNames.dashboard, component: MainPage },
  { path: Paths.history, name: PathsNames.history, component: History },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
