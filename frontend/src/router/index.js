import Vue from 'vue';
import VueRouter from 'vue-router';
import ListStudents from '../views/ListStudents.vue';
import RegisterStudent from '../views/RegisterStudent.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/students',
  },
  {
    path: '/students',
    name: 'students',
    component: ListStudents,
  },
  {
    path: '/students/register',
    name: 'student',
    component: RegisterStudent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
