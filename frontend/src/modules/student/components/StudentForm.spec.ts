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

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.text()).toContain('Nome');
            expect(wrapper.text()).toContain('Email');
            expect(wrapper.text()).toContain('CPF');
        });

        it('should show Salvar and Cancelar buttons', () => {
            const wrapper = mountStudentForm();

            expect(wrapper.text()).toContain('Salvar');
            expect(wrapper.text()).toContain('Cancelar');
        });

        it('should start with empty fields when no initialData', () => {
            const wrapper = mountStudentForm();
            const inputs = wrapper.findAll('input');

            inputs.forEach((input) => {
                expect((input.element as HTMLInputElement).value).toBe('');
            });
        });

        it('should populate fields with initialData', async () => {
            const initialData = {
                name: 'João Silva',
                email: 'joao@email.com',
                cpf: '12345678901'
            };

            const wrapper = mountStudentForm({ initialData });
            await flushPromises();

            const inputs = wrapper.findAll('input');
            const values = inputs.map(
                (input) => (input.element as HTMLInputElement).value
            );

            expect(values).toContain('João Silva');
            expect(values).toContain('joao@email.com');
            expect(values).toContain('12345678901');
        });
    });

    describe('Inputs', () => {
        it('should update name input value', async () => {
            const wrapper = mountStudentForm();
            const nameInput = wrapper.findAll('input')[0];

            await nameInput?.setValue('Maria Santos');

            expect((nameInput?.element as HTMLInputElement).value).toBe(
                'Maria Santos'
            );
        });

        it('should update email input value', async () => {
            const wrapper = mountStudentForm();
            const emailInput = wrapper.findAll('input')[1];

            await emailInput?.setValue('maria@email.com');

            expect((emailInput?.element as HTMLInputElement).value).toBe(
                'maria@email.com'
            );
        });

        it('should update cpf input value', async () => {
            const wrapper = mountStudentForm();
            const cpfInput = wrapper.findAll('input')[2];

            await cpfInput?.setValue('98765432100');

            expect((cpfInput?.element as HTMLInputElement).value).toBe(
                '98765432100'
            );
        });
    });

    describe('Validations', () => {
        it('should show error when name is too short', async () => {
            const wrapper = mountStudentForm();
            const nameInput = wrapper.findAll('input')[0];
            const emailInput = wrapper.findAll('input')[1];
            const cpfInput = wrapper.findAll('input')[2];

            await nameInput?.setValue('AB');
            await emailInput?.setValue('valid@email.com');
            await cpfInput?.setValue('12345678901');

            const form = wrapper.find('form');
            await form.trigger('submit.prevent');
            await flushPromises();

            expect(wrapper.text()).toContain(
                'Nome deve ter pelo menos 3 caracteres'
            );
        }, 10000);

        it('should show error when email is invalid', async () => {
            const wrapper = mountStudentForm();
            const nameInput = wrapper.findAll('input')[0];
            const emailInput = wrapper.findAll('input')[1];
            const cpfInput = wrapper.findAll('input')[2];

            await nameInput?.setValue('Maria Santos');
            await emailInput?.setValue('invalid-email');
            await cpfInput?.setValue('12345678901');

            const form = wrapper.find('form');
            await form.trigger('submit.prevent');
            await flushPromises();

            expect(wrapper.text()).toContain('Email inválido');
        }, 10000);

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
            const nameInput = wrapper.findAll('input')[0];
            const emailInput = wrapper.findAll('input')[1];
            const cpfInput = wrapper.findAll('input')[2];

            await nameInput?.setValue('Pedro Oliveira');
            await emailInput?.setValue('pedro@email.com');
            await cpfInput?.setValue('11122233344');

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
        }, 10000);

        it('should not emit submit event when form is invalid', async () => {
            const wrapper = mountStudentForm();
            const nameInput = wrapper.findAll('input')[0];

            await nameInput?.setValue('AB'); // Too short

            const form = wrapper.find('form');
            await form.trigger('submit.prevent');
            await flushPromises();

            const submitEvents = wrapper.emitted('submit');
            expect(submitEvents).toBeFalsy();
        }, 10000);

        it('should emit cancel event when Cancelar button is clicked', async () => {
            const wrapper = mountStudentForm();

            const cancelButton = wrapper
                .findAll('button')
                .find((btn) => btn.text().includes('Cancelar'));
            expect(cancelButton).toBeTruthy();

            await cancelButton!.trigger('click');

            const cancelEvents = wrapper.emitted('cancel');
            expect(cancelEvents).toBeTruthy();
        });
    });

    describe('Loading state', () => {
        it('should disable Cancelar button when loading', () => {
            const wrapper = mountStudentForm({ loading: true });

            const cancelButton = wrapper
                .findAll('button')
                .find((btn) => btn.text().includes('Cancelar'));
            expect(cancelButton?.attributes('disabled')).toBeDefined();
        });

        it('should show loading indicator on Salvar button when loading', () => {
            const wrapper = mountStudentForm({ loading: true });

            const saveButton = wrapper
                .findAll('button')
                .find((btn) => btn.text().includes('Salvar'));

            expect(saveButton?.classes().join(' ')).toContain('loading');
        });
    });
});
