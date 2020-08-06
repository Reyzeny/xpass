import Vue from 'vue';
import VueRouter from 'vue-router';
import constant from '@/constant';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: constant.HomeRoute,
    name: constant.HomeRouteName,
    component: () => import('../views/Home.vue'),
  },
  {
    path: constant.LoginRoute,
    name: constant.LoginRouteName,
    component: () => import('../views/Login.vue'),
    meta: { authRoute: true },
  },
  {
    path: constant.SignupRoute,
    name: constant.SignupRouteName,
    component: () => import('../views/Signup.vue'),
    meta: { authRoute: true },
  },
  {
    path: constant.VerifyOTPRoute,
    name: constant.VerifyOTPRouteName,
    component: () => import('../views/VerifyOTP.vue'),
  },
  {
    path: constant.DashboardRoute,
    name: constant.DashboardRouteName,
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: constant.ServiceRoute,
    name: constant.ServiceRouteName,
    component: () => import('@/views/Services.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: constant.ProfileRoute,
    name: constant.ProfileRouteName,
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: constant.LogoutRoute,
    name: constant.LogoutRouteName,
    component: () => import('@/views/Logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const topScrollBehaviour = () => ({ x: 0, y: 0 });
const retainScroll = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  return topScrollBehaviour(); // topScrollBehaviour(to, from, savedPosition)
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  retainScroll,
});

const isAuthenticated = () => {
  console.log('store is ', store);
  console.log('store is ', store.getters);
  console.log(store.state.user);
  console.log(store.state.user.isAuthenticated);
  console.log(store.state.isAuthenticated);
  console.log(store.user);
  const userData = JSON.parse(localStorage.getItem(constant.userData));
  return userData !== null && userData[constant.token] !== null;
};

// const nonProtectedRoutesName = [
//   constant.LoginRouteName,
//   constant.SignupRouteName,
//   constant.HomeRouteName,
//   constant.DashboardRouteName,
// ];

router.beforeEach((to, from, next) => {
  console.log('auth is ', isAuthenticated());
  // if (nonProtectedRoutesName.includes(to.name)) next();
  // else next({ name: constant.LoginRouteName });
  console.log('to is ', to);

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated()) next({ path: constant.LoginRoute, query: { redirect: to.fullPath } });
  else next();
});

export default router;
