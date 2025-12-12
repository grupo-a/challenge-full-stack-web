import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw
} from 'vue-router';
import { authRoutes } from '@/modules/auth/routes';
import { authGuard } from '@/core/guards/auth.guard';

import StudentsView from '@/views/StudentsView.vue';

const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/students'
    },
    {
        path: '/students',
        name: 'students',
        component: StudentsView,
        beforeEnter: authGuard,
        meta: {
            title: 'Alunos',
            requiresAuth: true
        }
    }
];

const routes: RouteRecordRaw[] = [
    ...authRoutes,
    ...baseRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
        meta: {
            title: 'Página não encontrada'
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, _from, next) => {
    const title = to.meta.title as string;

    document.title = title
        ? `${title} | Sistema de Alunos`
        : 'Sistema de Alunos';
    next();
});

export default router;
