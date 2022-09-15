import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/",
    component: () => import("@/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/Auth/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/Home/index.vue"),
      },
      {
        path: "transaction",
        name: "transaction",
        component: () => import("../views/Transaction/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
