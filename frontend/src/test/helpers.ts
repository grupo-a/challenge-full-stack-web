/**
 * Helpers para testes Vue
 * Fornece funções utilitárias para montar componentes em testes
 */
import { createPinia, setActivePinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createRouter, createWebHistory } from 'vue-router';

export const createTestVuetify = () => {
    return createVuetify({
        components,
        directives
    });
};

export const createTestPinia = () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    return pinia;
};

export const createTestRouter = () => {
    return createRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'home',
                component: { template: '<div>Home</div>' }
            },
            {
                path: '/login',
                name: 'login',
                component: { template: '<div>Login</div>' }
            },
            {
                path: '/register',
                name: 'register',
                component: { template: '<div>Register</div>' }
            },
            {
                path: '/students',
                name: 'students',
                component: { template: '<div>Students</div>' }
            }
        ]
    });
};

export const getGlobalMountOptions = () => {
    const vuetify = createTestVuetify();
    const pinia = createTestPinia();
    const router = createTestRouter();

    return {
        global: {
            plugins: [vuetify, pinia, router],
            stubs: {
                teleport: true
            }
        }
    };
};
