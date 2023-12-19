import { createRouter, createWebHistory } from 'vue-router'
import ChangeStudents from '../views/ChangeStudents.vue'
import ConsultStudents from '../views/ConsultStudents.vue'
import CreateStudents from '../views/CreateStudents.vue'
import UserLogin from '@/views/UserLogin.vue'
import CreateUsers from '@/views/CreateUsers.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'user-login',
            component: UserLogin,
        },
        {
            path: '/register',
            name: 'create-user',
            component: () => CreateUsers,
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
    } else if (!authRequired && loggedIn) {
        next('/consult-students')
    } else {
        next()
    }
})

export default router
