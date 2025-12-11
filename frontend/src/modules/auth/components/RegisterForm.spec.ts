/**
 * Testes unitários para RegisterForm.vue
 *
 * Este arquivo testa o componente de formulário de registro
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import RegisterForm from '../components/RegisterForm.vue';

const vuetify = createVuetify({
    components,
    directives
});

const mountRegisterForm = (props = {}) => {
    return mount(RegisterForm, {
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

describe('RegisterForm.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Renderização', () => {
        it('should render the register form', () => {
            const wrapper = mountRegisterForm();

            expect(wrapper.find('[data-testid="name-input"]').exists()).toBe(
                true
            );
            expect(wrapper.find('[data-testid="email-input"]').exists()).toBe(
                true
            );
            expect(
                wrapper.find('[data-testid="password-input"]').exists()
            ).toBe(true);
            expect(
                wrapper.find('[data-testid="confirm-password-input"]').exists()
            ).toBe(true);
            expect(
                wrapper.find('[data-testid="register-button"]').exists()
            ).toBe(true);
        });

        it('should show the title "Cadastro"', () => {
            const wrapper = mountRegisterForm();
            expect(wrapper.text()).toContain('Cadastro');
        });

        it('should show link to login page', () => {
            const wrapper = mountRegisterForm();
            expect(wrapper.find('[data-testid="login-link"]').exists()).toBe(
                true
            );
            expect(wrapper.text()).toContain('Faça login');
        });
    });

    describe('Inputs', () => {
        it('should update name input value', async () => {
            const wrapper = mountRegisterForm();
            const nameInput = wrapper.find('[data-testid="name-input"] input');

            await nameInput.setValue('João Silva');

            expect((nameInput.element as HTMLInputElement).value).toBe(
                'João Silva'
            );
        });

        it('should update email input value', async () => {
            const wrapper = mountRegisterForm();
            const emailInput = wrapper.find(
                '[data-testid="email-input"] input'
            );

            await emailInput.setValue('test@example.com');

            expect((emailInput.element as HTMLInputElement).value).toBe(
                'test@example.com'
            );
        });

        it('should update password input value', async () => {
            const wrapper = mountRegisterForm();
            const passwordInput = wrapper.find(
                '[data-testid="password-input"] input'
            );

            await passwordInput.setValue('password123');

            expect((passwordInput.element as HTMLInputElement).value).toBe(
                'password123'
            );
        });

        it('should update confirm password input value', async () => {
            const wrapper = mountRegisterForm();
            const confirmPasswordInput = wrapper.find(
                '[data-testid="confirm-password-input"] input'
            );

            await confirmPasswordInput.setValue('password123');

            expect(
                (confirmPasswordInput.element as HTMLInputElement).value
            ).toBe('password123');
        });

        it('should start with password input type', async () => {
            const wrapper = mountRegisterForm();
            const passwordInput = wrapper.find(
                '[data-testid="password-input"] input'
            );

            expect(passwordInput.attributes('type')).toBe('password');
        });

        it('should start with confirm password input type', async () => {
            const wrapper = mountRegisterForm();
            const confirmPasswordInput = wrapper.find(
                '[data-testid="confirm-password-input"] input'
            );

            expect(confirmPasswordInput.attributes('type')).toBe('password');
        });
    });

    describe('Validations', () => {
        it('should have button enabled even with empty form', async () => {
            const wrapper = mountRegisterForm();
            const registerButton = wrapper.find(
                '[data-testid="register-button"]'
            );

            expect(registerButton.attributes('disabled')).toBeUndefined();
        });

        it('should show name error message with short name', async () => {
            const wrapper = mountRegisterForm();

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('Jo');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
                .setValue('password123');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            const nameInput = wrapper.find('[data-testid="name-input"]');
            const errorMessages = nameInput.findAll('.v-messages__message');

            expect(errorMessages.length).toBeGreaterThan(0);
            expect(
                errorMessages.some((msg) => msg.text().includes('no mínimo 3'))
            ).toBe(true);
        });

        it('should show email error message with invalid email', async () => {
            const wrapper = mountRegisterForm();

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('João Silva');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('invalid-email');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
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
            const wrapper = mountRegisterForm();

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('João Silva');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
                .setValue('123');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            const passwordInput = wrapper.find(
                '[data-testid="password-input"]'
            );
            const errorMessages = passwordInput.findAll('.v-messages__message');

            expect(errorMessages.length).toBeGreaterThan(0);
            expect(
                errorMessages.some((msg) => msg.text().includes('no mínimo 6'))
            ).toBe(true);
        });

        it('should show error message when passwords do not match', async () => {
            const wrapper = mountRegisterForm();

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('João Silva');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
                .setValue('password456');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            const confirmPasswordInput = wrapper.find(
                '[data-testid="confirm-password-input"]'
            );
            const errorMessages = confirmPasswordInput.findAll(
                '.v-messages__message'
            );

            expect(errorMessages.length).toBeGreaterThan(0);
            expect(
                errorMessages.some((msg) =>
                    msg.text().includes('não coincidem')
                )
            ).toBe(true);
        });

        it('should clear error messages on valid input', async () => {
            const wrapper = mountRegisterForm();

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('Jo');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('invalid-email');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
                .setValue('456');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            let nameInputErrors = wrapper
                .find('[data-testid="name-input"]')
                .findAll('.v-messages__message');
            let emailInputErrors = wrapper
                .find('[data-testid="email-input"]')
                .findAll('.v-messages__message');
            let passwordInputErrors = wrapper
                .find('[data-testid="password-input"]')
                .findAll('.v-messages__message');
            let confirmPasswordInputErrors = wrapper
                .find('[data-testid="confirm-password-input"]')
                .findAll('.v-messages__message');

            const totalErrors =
                nameInputErrors.length +
                emailInputErrors.length +
                passwordInputErrors.length +
                confirmPasswordInputErrors.length;

            expect(totalErrors).toBeGreaterThan(0);

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('João Silva');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
                .setValue('password123');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            nameInputErrors = wrapper
                .find('[data-testid="name-input"]')
                .findAll('.v-messages__message');
            emailInputErrors = wrapper
                .find('[data-testid="email-input"]')
                .findAll('.v-messages__message');
            passwordInputErrors = wrapper
                .find('[data-testid="password-input"]')
                .findAll('.v-messages__message');
            confirmPasswordInputErrors = wrapper
                .find('[data-testid="confirm-password-input"]')
                .findAll('.v-messages__message');

            const totalErrorsAfter =
                nameInputErrors.length +
                emailInputErrors.length +
                passwordInputErrors.length +
                confirmPasswordInputErrors.length;

            expect(totalErrorsAfter).toBe(0);
        });

        it('should show no errors with valid data', async () => {
            const wrapper = mountRegisterForm();

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('João Silva');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
                .setValue('password123');
            await flushPromises();

            const nameErrors = wrapper.findAll(
                '[data-testid="name-input"] .v-messages__message'
            );
            const emailErrors = wrapper.findAll(
                '[data-testid="email-input"] .v-messages__message'
            );
            const passwordErrors = wrapper.findAll(
                '[data-testid="password-input"] .v-messages__message'
            );
            const confirmPasswordErrors = wrapper.findAll(
                '[data-testid="confirm-password-input"] .v-messages__message'
            );

            expect(
                nameErrors.length +
                    emailErrors.length +
                    passwordErrors.length +
                    confirmPasswordErrors.length
            ).toBe(0);
        });
    });

    describe('Events', () => {
        it('should emit submit event with register data on submit', async () => {
            const wrapper = mountRegisterForm();

            await wrapper
                .find('[data-testid="name-input"] input')
                .setValue('João Silva');
            await wrapper
                .find('[data-testid="email-input"] input')
                .setValue('test@example.com');
            await wrapper
                .find('[data-testid="password-input"] input')
                .setValue('password123');
            await wrapper
                .find('[data-testid="confirm-password-input"] input')
                .setValue('password123');
            await flushPromises();

            await wrapper.find('form').trigger('submit');
            await flushPromises();

            const submitEvents = wrapper.emitted('submit');
            if (submitEvents) {
                expect(submitEvents[0]).toEqual([
                    {
                        name: 'João Silva',
                        email: 'test@example.com',
                        password: 'password123'
                    }
                ]);
            }
        });

        it('should emit login event when clicking login link', async () => {
            const wrapper = mountRegisterForm();

            await wrapper.find('[data-testid="login-link"]').trigger('click');
            await flushPromises();

            expect(wrapper.emitted('login')).toBeTruthy();
        });
    });

    describe('Estado de loading', () => {
        it('should show loading indicator when loading=true', async () => {
            const wrapper = mountRegisterForm({ loading: true });
            const registerButton = wrapper.find(
                '[data-testid="register-button"]'
            );

            expect(registerButton.attributes('disabled')).toBeDefined();
        });

        it('should disable button when loading=true', async () => {
            const wrapper = mountRegisterForm({ loading: true });
            const registerButton = wrapper.find(
                '[data-testid="register-button"]'
            );

            expect(registerButton.attributes('disabled')).toBeDefined();
        });
    });
});
