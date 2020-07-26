import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const defaultTitle = process.env.VUE_APP_NAME

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: `${defaultTitle}`,
      metaTags: [
        {
          name: 'description',
          content: 'The Home page.'
        },
        {
          property: 'og:description',
          content: 'The Home page.'
        }
      ]
    },
    component: () => import('@/views/Home')
  },
  {
    path: '/students',
    name: 'Students',
    meta: {
      role: 'admin',
      title: `Alunos | ${defaultTitle}`,
      metaTags: [
        {
          name: 'description',
          content: 'The Students page.'
        },
        {
          property: 'og:description',
          content: 'The Students page.'
        }
      ]
    },
    component: () => import('@/views/Students')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) {
    return next()
  }

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
