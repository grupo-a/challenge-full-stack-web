import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

export const authGuard = (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        next();
        return;
    }

    next({
        name: 'login',
        query: { redirect: to.fullPath }
    });
};

export const guestGuard = (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        next({ name: 'students' });
        return;
    }

    next();
};
