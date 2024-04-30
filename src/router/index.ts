import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { CustomRouterRecord } from "../constants/types";
import Layout from "../views/Layout/index.vue";
import Index from "../views/index.vue";
import States from "../views/Pipeline/states.vue";
import Display from "../views/Pipeline/display.vue";
import File from "../views/File/index.vue";
import Pipeline from "../views/Pipeline/index.vue";

const routes: Array<CustomRouterRecord> = [
  {
    path: "/",
    name: "home",
    showSidebar: true,
    hasChild: true,
    children: [
      {
        path: "",
        name: "main page",
        component: Index,
      },
    ],
    meta: { requiresAuth: false },
    component: Layout,
  },
  {
    path: "/pipeline",
    name: "pipeline",
    showSidebar: true,
    hasChild: true,
    children: [
      {
        path: "",
        name: "main pipeline",
        component: Pipeline,
      },
    ],
    meta: { requiresAuth: false },
    component: Layout,
  },
  {
    path: "/pipeline/display",
    name: "display",
    showSidebar: true,
    hasChild: true,
    children: [
      {
        path: "",
        name: "pipeline-display",
        component: Display,
      },
    ],
    meta: { requiresAuth: false },
    component: Layout,
  },
  {
    path: "/pipeline/states",
    name: "states",
    showSidebar: true,
    hasChild: true,
    children: [
      {
        path: "",
        name: "pipeline-states",
        component: States,
      },
    ],
    meta: { requiresAuth: false },
    component: Layout,
  },
  {
    path: "/file",
    name: "file",
    showSidebar: true,
    hasChild: true,
    children: [
      {
        path: "",
        name: "file-add",
        component: File,
      },
    ],
    meta: { requiresAuth: false },
    component: Layout,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as Array<RouteRecordRaw>,
});

export { routes };

export default router;

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem("content_superz");

//   if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
//     next("/login");
//   }
//   next();
// });
