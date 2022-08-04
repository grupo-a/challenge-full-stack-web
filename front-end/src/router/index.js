import { createRouter, createWebHistory } from 'vue-router';
import StudentsView from '../views/StudentsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: StudentsView,
  },
  {
    path: '/cadastrar',
    name: 'CadastroStudents',
    component: () => import(/* webpackChunkName: "about" */ '../views/CadastroView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
