import store from '@/store';
import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Consulta de alunos' },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  store.commit('setPageTitle', to.meta.title);
});

export default router;
