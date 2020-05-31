import StudentList from '@/components/Student/StudentList.vue';
import StudentCreate from '@/components/Student/StudentCreate.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/estudante/cadastro',
    name: 'StudentCreate',
    component: StudentCreate,
  },
  {
    path: '/estudante/lista',
    name: 'StudentList',
    component: StudentList,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
