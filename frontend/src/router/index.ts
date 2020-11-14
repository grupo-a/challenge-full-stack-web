import store from '@/store';
import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/alunos',
    name: 'student.index',
    component: () => import('../views/student/Index.vue'),
    meta: { title: 'Consulta de alunos' },
  },
  {
    path: '/alunos/cadastrar',
    name: 'student.create',
    component: () => import('../views/student/Create.vue'),
    meta: { title: 'Cadastro de aluno' },
  },
  {
    path: '/alunos/:id/editar',
    name: 'student.edit',
    component: () => import('../views/student/Edit.vue'),
    meta: { title: 'Editar aluno' },
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
