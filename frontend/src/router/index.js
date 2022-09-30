import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListStudents from '../views/ListStudents.vue';
import RegisterStudent from '../views/RegisterStudent.vue';
import EditStudent from '../views/EditStudent.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/students',
    name: 'students',
    component: ListStudents
  },
  {
    path: '/students/create',
    name: 'createStudent',
    component: RegisterStudent
  },
  {
    path: '/students/:id/edit',
    name: 'editStudent',
    component: EditStudent
  }
]

const router = new VueRouter({
  routes
})

export default router
