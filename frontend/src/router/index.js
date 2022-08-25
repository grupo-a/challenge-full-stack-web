import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ListStudents from '../views/ListStudents.vue';
import RegisterStudent from '../views/RegisterStudent.vue';
import EditStudent from '../views/EditStudent.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
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
  {
    path: '/students/edit/:id',
    name: 'editStudent',
    component: EditStudent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
