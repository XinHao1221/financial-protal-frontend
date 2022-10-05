import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '../api/AuthTokenService';
import store from '../store';

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
    path: '/',
    redirect: 'login',
    component: () => import('@/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Auth/Login.vue'),
        meta: { hideForAuth: true }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/MainLayout.vue'),
    beforeEnter: async (to, from, next) => {
      await store.dispatch('getConstant', null, { root: true });
      return next();
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home/index.vue')
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: () => import('../views/Transaction/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const hideForAuth = to.matched.some((record) => record.meta.hideForAuth);
  const isLogin = getToken();

  if (requiresAuth && !isLogin) {
    next('/login');
  } else if (hideForAuth && isLogin) {
    next('/home');
  } else {
    next();
  }
});

export default router;
