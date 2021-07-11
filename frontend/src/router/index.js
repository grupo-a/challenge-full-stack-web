import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Page404 from '../views/404/404.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            label: 'Home'
        },
    },
    {
        path: '/alunos',
        component: () => import(/* webpackChunkName: "alunos" */ '../views/Students/Students.vue'),
        children: [
            {
                path: '/',
                name: 'StudentList',
                meta: {
                    label: 'Alunos > Listagem'
                },
                component: () => import(/* webpackChunkName: "alunos" */ '../views/Students/StudentsList.vue'),
            },
            {
                path: 'new',
                name: 'StudentNew',
                meta: {
                    label: 'Alunos > Novo'
                },
                component: () => import(/* webpackChunkName: "alunos" */ '../views/Students/StudentsForm.vue'),
            },
            {
                path: 'edit/:id',
                name: 'StudentEdit',
                meta: {
                    label: 'Alunos > Editar'
                },
                component: () => import(/* webpackChunkName: "alunos" */ '../views/Students/StudentsForm.vue'),
            },
            { path: "*", component: Page404 }
        ]
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

    }
]

const router = new VueRouter({
    routes
})

export default router
