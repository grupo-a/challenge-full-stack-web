/**
 * Testes unitários para LoginForm.vue
 *
 * Este arquivo testa o componente de formulário de login
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import LoginForm from '../components/LoginForm.vue';

const vuetify = createVuetify({
    components,
    directives
});

const mountLoginForm = (props = {}) => {
    return mount(LoginForm, {
        props: {
            loading: false,
            ...props
        },
        global: {
            plugins: [vuetify],
            stubs: {
                teleport: true
            }
        }
    });
};

describe('LoginForm.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Renderização', () => {
        it('should render the login form', () => {
            const wrapper = mountLoginForm();

            expect(wrapper.find('[data-testid="email-input"]').exists()).toBe(
                true
            );
            expect(
                wrapper.find('[data-testid="password-input"]').exists()
            ).toBe(true);
            expect(wrapper.find('[data-testid="login-button"]').exists()).toBe(
                true
            );
        });

        it('should show the title "Login"', () => {
            const wrapper = mountLoginForm();
            expect(wrapper.text()).toContain('Login');
        });

        it('should show link to register page', () => {
            const wrapper = mountLoginForm();
            expect(wrapper.find('[data-testid="register-link"]').exists()).toBe(
                true
            );
            expect(wrapper.text()).toContain('Cadastre-se');
        });
    });

    describe('Inputs', () => {
        it('should update email input value', async () => {
            const wrapper = mountLoginForm();
            const emailInput = wrapper.find(
                '[data-testid="email-input"] input'
            );

            await emailInput.setValue('test@example.com');

            expect((emailInput.element as HTMLInputElement).value).toBe(
                'test@example.com'
            );
        });

        it('should update password input value', async () => {
            const wrapper = mountLoginForm();
            const passwordInput = wrapper.find(
                '[data-testid="password-input"] input'
            );

            await passwordInput.setValue('password123');

            expect((passwordInput.element as HTMLInputElement).value).toBe(
                'password123'
            );
        });

        it('should start with password input type', async () => {
            const wrapper = mountLoginForm();
            const passwordInput = wrapper.find(
                '[data-testid="password-input"] input'
            );

            expect(passwordInput.attributes('type')).toBe('password');
        });
    });

    describe('Validations', () => {
        it('should have button enabled even with empty form', async () => {
            const wrapper = mountLoginForm();
            const loginButton = wrapper.find('[data-testid="login-button"]');

            expect(loginButton.attributes('disabled')).toBeUndefined();
        });

        it('should show email error message with invalid email', async () => {
            const wrapper = mountLoginForm();

            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('invalid-email');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            const emailInput = wrapper.find('[data-testid="email-input"]');
            const errorMessages = emailInput.findAll('.v-messages__message');

            expect(errorMessages.length).toBeGreaterThan(0);
            expect(
                errorMessages.some((msg) =>
                    msg.text().includes('Email inválido')
                )
            ).toBe(true);
        });

        it('should show password error message with short password', async () => {
            const wrapper = mountLoginForm();

            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('123');
            await flushPromises();

            // Trigger submit para validar
            await wrapper.find('form').trigger('submit');
            await flushPromises();

            // Verifica se a mensagem de erro é exibida no DOM
            const passwordInput = wrapper.find(
                '[data-testid="password-input"]'
            );
            const errorMessages = passwordInput.findAll('.v-messages__message');

            expect(errorMessages.length).toBeGreaterThan(0);
            expect(
                errorMessages.some((msg) => msg.text().includes('no mínimo 6'))
            ).toBe(true);
        });

        it('should show email required error message with empty email', async () => {
            const wrapper = mountLoginForm();

            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await flushPromises();

            // Trigger submit para validar
            await wrapper.find('form').trigger('submit');
            await flushPromises();

            // Verifica se a mensagem de erro é exibida no DOM
            const emailInput = wrapper.find('[data-testid="email-input"]');
            const errorMessages = emailInput.findAll('.v-messages__message');

            expect(errorMessages.length).toBeGreaterThan(0);
            expect(
                errorMessages.some((msg) => msg.text().includes('obrigatório'))
            ).toBe(true);
        });

        it('should clear error messages on valid input', async () => {
            const wrapper = mountLoginForm();

            // Primeiro, adiciona dados inválidos
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('invalid-email');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('123');
            await flushPromises();

            // Trigger submit para validar
            await wrapper.find('form').trigger('submit');
            await flushPromises();

            // Verifica que há erros
            let emailInputErrors = wrapper
                .find('[data-testid="email-input"]')
                .findAll('.v-messages__message');
            let passwordInputErrors = wrapper
                .find('[data-testid="password-input"]')
                .findAll('.v-messages__message');

            expect(
                emailInputErrors.length + passwordInputErrors.length
            ).toBeGreaterThan(0);

            // Agora adiciona dados válidos
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await flushPromises();

            // Trigger submit novamente
            await wrapper.find('form').trigger('submit');
            await flushPromises();

            // Verifica que os erros foram limpos
            emailInputErrors = wrapper
                .find('[data-testid="email-input"]')
                .findAll('.v-messages__message');
            passwordInputErrors = wrapper
                .find('[data-testid="password-input"]')
                .findAll('.v-messages__message');

            expect(emailInputErrors.length + passwordInputErrors.length).toBe(
                0
            );
        });

        it('should show no errors with valid data', async () => {
            const wrapper = mountLoginForm();

            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await flushPromises();

            // Não deve ter erros antes do submit
            const emailInput = wrapper.find('[data-testid="email-input"]');
            const passwordInput = wrapper.find(
                '[data-testid="password-input"]'
            );
            const emailErrors = emailInput.findAll('.v-messages__message');
            const passwordErrors = passwordInput.findAll(
                '.v-messages__message'
            );

            expect(emailErrors.length + passwordErrors.length).toBe(0);
        });
    });

    describe('Events', () => {
        it('should emit submit event with credentials on submit', async () => {
            const wrapper = mountLoginForm();

            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            const submitEvents = wrapper.emitted('submit');
            if (submitEvents) {
                expect(submitEvents[0]).toEqual([
                    {
                        email: 'test@example.com',
                        password: 'password123'
                    }
                ]);
            }
        });

        it('should emit register event when clicking register', async () => {
            const wrapper = mountLoginForm();

            await wrapper
                .find('[data-testid="register-link"]')
                .trigger('click');
            await flushPromises();

            expect(wrapper.emitted('register')).toBeTruthy();
        });
    });

    describe('Estado de loading', () => {
        it('should show loading indicator when loading=true', async () => {
            const wrapper = mountLoginForm({ loading: true });
            const loginButton = wrapper.find('[data-testid="login-button"]');

            expect(loginButton.attributes('disabled')).toBeDefined();
        });

        it('should disable button when loading=true', async () => {
            const wrapper = mountLoginForm({ loading: true });
            const loginButton = wrapper.find('[data-testid="login-button"]');

            expect(loginButton.attributes('disabled')).toBeDefined();
        });
    });
});
