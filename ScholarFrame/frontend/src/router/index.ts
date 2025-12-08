import { createRouter, createWebHistory } from 'vue-router';
import StudentList from '../components/StudentList.vue';
import StudentForm from '../components/StudentForm.vue';
import LoginView from '../views/LoginView.vue'; // Importe a nova view

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    redirect: '/students'
  },
  {
    path: '/students',
    name: 'students',
    component: StudentList,
    meta: { requiresAuth: true } // <--- MARK AS PROTECTED
  },
  {
    path: '/students/new',
    name: 'student-create',
    component: StudentForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/students/edit/:ra',
    name: 'student-edit',
    component: StudentForm,
    props: true,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

//NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user_token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    //If route is protected and user has no token, send to Login
    next('/login');
  } else {
    next();
  }
});

export default router;