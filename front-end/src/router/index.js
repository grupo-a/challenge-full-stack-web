import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentsView from '../views/StudentsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'students',
    component: StudentsView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
