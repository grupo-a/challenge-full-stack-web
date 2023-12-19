import { createRouter, createWebHistory } from 'vue-router'
import ChangeStudents from '../views/ChangeStudents.vue'
import ConsultStudents from '../views/ConsultStudents.vue'
import CreateStudents from '../views/CreateStudents.vue'
import UserLoginVue from '@/views/UserLogin.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'user-login',
            component: UserLoginVue,
        },
        {
            path: '/consult-students',
            name: 'consult-students',
            component: () => ConsultStudents,
            meta: {
                auth: true,
            },
        },
        {
            path: '/create-students',
            name: 'create-students',
            component: () => CreateStudents,
            meta: {
                auth: true,
            },
        },
        {
            path: '/change-students/:id',
            name: 'change-students',
            component: () => ChangeStudents,
            meta: {
                auth: true,
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/register']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('token')

    if (authRequired && !loggedIn) {
        next('/')
    } else {
        next()
    }
})

export default router
