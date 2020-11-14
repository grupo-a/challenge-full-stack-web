import store from '@/store';
import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/student/Index.vue'),
    meta: { title: 'Consulta de alunos' },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  store.commit('setPageTitle', to.meta.title);
  next();
});

export default router;
