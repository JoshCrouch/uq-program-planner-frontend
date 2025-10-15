import { createRouter, createWebHistory } from "vue-router";
import BuilderPage from "../views/BuilderPage.vue";
import PlannerPage from "../views/PlannerPage.vue";

const routes = [
  { path: "/builder", component: BuilderPage, name: "Builder" },
  { path: "/planner", component: PlannerPage, name: "Planner" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
