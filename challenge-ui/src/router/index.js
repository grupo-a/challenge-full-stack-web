import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Consulta de alunos',
    component: List
  },
  {
    path: '/cadastro',
    name: 'Cadastro de Aluno',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
