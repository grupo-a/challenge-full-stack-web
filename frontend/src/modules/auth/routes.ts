import type { RouteRecordRaw } from 'vue-router';
import { guestGuard } from '@/core/guards/auth.guard';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        beforeEnter: guestGuard,
        meta: {
            title: 'Login',
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        beforeEnter: guestGuard,
        meta: {
            title: 'Cadastro',
            requiresAuth: false
        }
    }
];
