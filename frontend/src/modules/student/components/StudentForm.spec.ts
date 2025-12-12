import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import StudentForm from './StudentForm.vue';

const vuetify = createVuetify({
    components,
    directives
});

const mountStudentForm = (props = {}) => {
    return mount(StudentForm, {
        props: {
            isEditing: false,
            loading: false,
            validationErrors: null,
            initialData: null,
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

describe('StudentForm.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render the student form with all required fields', () => {
            const wrapper = mountStudentForm();

            expect(wrapper.find('[data-testid="name-input"]').exists()).toBe(
                true
            );
            expect(wrapper.find('[data-testid="email-input"]').exists()).toBe(
                true
            );
            expect(wrapper.find('[data-testid="cpf-input"]').exists()).toBe(
                true
            );
        });

        it('should show Salvar and Cancelar buttons', () => {
            const wrapper = mountStudentForm();

            expect(wrapper.find('[data-testid="save-button"]').exists()).toBe(
                true
            );
            expect(wrapper.find('[data-testid="cancel-button"]').exists()).toBe(
                true
            );
        });

        it('should start with empty fields when no initialData', () => {
            const wrapper = mountStudentForm();

            expect(
                (
                    wrapper.find('[data-testid="name-input"] input')
                        .element as HTMLInputElement
                ).value
            ).toBe('');
            expect(
                (
                    wrapper.find('[data-testid="email-input"] input')
                        .element as HTMLInputElement
                ).value
            ).toBe('');
            expect(
                (
                    wrapper.find('[data-testid="cpf-input"] input')
                        .element as HTMLInputElement
                ).value
            ).toBe('');
        });

        it('should populate fields with initialData', async () => {
            const initialData = {
                name: 'João Silva',
                email: 'joao@email.com',
                cpf: '12345678901'
            };

            const wrapper = mountStudentForm({ initialData });
            await flushPromises();

            expect(
                (
                    wrapper.find('[data-testid="name-input"] input')
                        .element as HTMLInputElement
                ).value
            ).toBe('João Silva');
            expect(
                (
                    wrapper.find('[data-testid="email-input"] input')
                        .element as HTMLInputElement
                ).value
            ).toBe('joao@email.com');
            expect(
                (
                    wrapper.find('[data-testid="cpf-input"] input')
                        .element as HTMLInputElement
                ).value
            ).toBe('12345678901');
        });

        it('should show RA field only in edit mode', async () => {
            const wrapper = mountStudentForm({ isEditing: true });
            expect(wrapper.find('[data-testid="ra-input"]').exists()).toBe(
                true
            );

            const wrapperCreate = mountStudentForm({ isEditing: false });
            expect(
                wrapperCreate.find('[data-testid="ra-input"]').exists()
            ).toBe(false);
        });
    });

    describe('Inputs', () => {
        it('should update name input value', async () => {
            const wrapper = mountStudentForm();
            const nameInput = wrapper.find('[data-testid="name-input"] input');

            await nameInput.setValue('Maria Santos');

            expect((nameInput.element as HTMLInputElement).value).toBe(
                'Maria Santos'
            );
        });

        it('should update email input value', async () => {
            const wrapper = mountStudentForm();
            const emailInput = wrapper.find(
                '[data-testid="email-input"] input'
            );

            await emailInput.setValue('maria@email.com');

            expect((emailInput.element as HTMLInputElement).value).toBe(
                'maria@email.com'
            );
        });

        it('should update cpf input value', async () => {
            const wrapper = mountStudentForm();
            const cpfInput = wrapper.find('[data-testid="cpf-input"] input');

            await cpfInput.setValue('98765432100');

            expect((cpfInput.element as HTMLInputElement).value).toBe(
                '98765432100'
            );
        });
    });

    describe('Validations', () => {
        it('should show error when name is too short', async () => {
            const wrapper = mountStudentForm();
            const cpfInput = wrapper.find('[data-testid="cpf-input"] input');
            const nameInput = wrapper.find('[data-testid="name-input"] input');
            const emailInput = wrapper.find(
                '[data-testid="email-input"] input'
            );

            await cpfInput.setValue('12345678901');
            await nameInput.setValue('AB');
            await emailInput.setValue('valid@email.com');

            const form = wrapper.find('form');
            await form.trigger('submit.prevent');
            await flushPromises();
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain(
                'Nome deve ter pelo menos 3 caracteres'
            );
        });

        it('should show error when email is invalid', async () => {
            const wrapper = mountStudentForm();
            const cpfInput = wrapper.find('[data-testid="cpf-input"] input');
            const nameInput = wrapper.find('[data-testid="name-input"] input');
            const emailInput = wrapper.find(
                '[data-testid="email-input"] input'
            );

            await cpfInput.setValue('12345678901');
            await nameInput.setValue('Maria Santos');
            await emailInput.setValue('invalid-email');

            const form = wrapper.find('form');
            await form.trigger('submit.prevent');
            await flushPromises();
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain('Email inválido');
        });

        it('should display external validation errors from API', async () => {
            const validationErrors = {
                cpf: ['CPF já está em uso']
            };

            const wrapper = mountStudentForm();
            await wrapper.setProps({ validationErrors });
            await flushPromises();
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain('CPF já está em uso');
        });
    });

    describe('Events', () => {
        it('should emit submit event with form data on valid submit', async () => {
            const wrapper = mountStudentForm();
            const cpfInput = wrapper.find('[data-testid="cpf-input"] input');
            const nameInput = wrapper.find('[data-testid="name-input"] input');
            const emailInput = wrapper.find(
                '[data-testid="email-input"] input'
            );

            await cpfInput.setValue('11122233344');
            await nameInput.setValue('Pedro Oliveira');
            await emailInput.setValue('pedro@email.com');

            const form = wrapper.find('form');
            await form.trigger('submit.prevent');
            await flushPromises();

            const submitEvents = wrapper.emitted('submit');
            expect(submitEvents).toBeTruthy();
            expect(submitEvents![0]).toEqual([
                {
                    name: 'Pedro Oliveira',
                    email: 'pedro@email.com',
                    cpf: '11122233344'
                }
            ]);
        });

        it('should not emit submit event when form is invalid', async () => {
            const wrapper = mountStudentForm();
            const nameInput = wrapper.find('[data-testid="name-input"] input');

            await nameInput.setValue('AB'); // Too short

            const form = wrapper.find('form');
            await form.trigger('submit.prevent');
            await flushPromises();

            expect(wrapper.emitted('submit')).toBeFalsy();
        });

        it('should emit cancel event when Cancelar button is clicked', async () => {
            const wrapper = mountStudentForm();
            const cancelButton = wrapper.find('[data-testid="cancel-button"]');

            await cancelButton.trigger('click');

            expect(wrapper.emitted('cancel')).toBeTruthy();
        });

        it('should disable Cancelar button when loading', async () => {
            const wrapper = mountStudentForm({ loading: true });
            const cancelButton = wrapper.find('[data-testid="cancel-button"]');

            expect(cancelButton.attributes('disabled')).toBeDefined();
        });

        it('should show loading indicator on Salvar button when loading', async () => {
            const wrapper = mountStudentForm({ loading: true });
            const saveButton = wrapper.find('[data-testid="save-button"]');

            expect(saveButton.classes()).toContain('v-btn--loading');
        });
    });
});
