import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentsView from '../views/StudentsView.vue'
import RegisterView from '../views/RegisterView.vue'
// import SidebarView from '../views/SidebarView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'students',
    component: StudentsView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
