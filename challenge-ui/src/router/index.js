import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cadastro/:id?',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
        next()
      }
      else{
        next({ name: 'list'})
      }
  }else {
    next()
  }
})

export default router
