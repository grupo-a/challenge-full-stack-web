import Vue from 'vue'
import Router from 'vue-router'
import Error from '@/components/common/Error'
import Layout from '@/components/common/Layout'
import ListStudent from '@/components/views/ListStudent'
import FormStudent from '@/components/views/FormStudent'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/list',
          name: 'List',
          component: ListStudent
        },
        {
          path: '/form',
          name: 'Form',
          component: FormStudent,
          props: true
        }
      ]
    },
    {
      path: '/*',
      name: '404',
      component: Error
    }
  ]

})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    next('/list')
  } else {
    next()
  }
})

export default router
