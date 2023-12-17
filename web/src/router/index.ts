import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChangeStudents from '../views/ChangeStudents.vue'
import ConsultStudents from '../views/ConsultStudents.vue'
import CreateStudents from '../views/CreateStudents.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/consult-students',
            name: 'Consult students',
            component: ConsultStudents,
        },
        {
            path: '/create-students',
            name: 'Create students',
            component: CreateStudents,
        },
        {
            path: '/change-students/:id',
            name: 'Change students',
            component: ChangeStudents,
        },
    ],
})

export default router
