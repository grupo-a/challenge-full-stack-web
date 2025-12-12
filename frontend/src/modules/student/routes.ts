import type { RouteRecordRaw } from 'vue-router';
import { authGuard } from '@/core/guards/auth.guard';
import StudentsListView from './views/StudentsListView.vue';
import StudentFormView from './views/StudentFormView.vue';

export const studentRoutes: RouteRecordRaw[] = [
    {
        path: '/students',
        name: 'students-list',
        component: StudentsListView,
        meta: {
            requiresAuth: true,
            title: 'Consulta de Alunos'
        },
        beforeEnter: authGuard
    },
    {
        path: '/students/create',
        name: 'student-create',
        component: StudentFormView,
        meta: {
            requiresAuth: true,
            title: 'Cadastro de Aluno'
        },
        beforeEnter: authGuard
    },
    {
        path: '/students/:id/edit',
        name: 'student-edit',
        component: StudentFormView,
        meta: {
            requiresAuth: true,
            title: 'Editar Aluno'
        },
        beforeEnter: authGuard
    }
];
