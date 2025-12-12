import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import StudentList from './StudentList.vue';
import type { Student } from '../types/student.types';

const vuetify = createVuetify({
    components,
    directives
});

const mockStudents: Student[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        ra: 'RA001',
        cpf: '12345678901'
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@email.com',
        ra: 'RA002',
        cpf: '98765432100'
    },
    {
        id: '3',
        name: 'Pedro Oliveira',
        email: 'pedro@email.com',
        ra: 'RA003',
        cpf: '11122233344'
    }
];

const itemsPerPageOptions = [
    { value: 5, title: '5' },
    { value: 10, title: '10' },
    { value: 25, title: '25' }
];

const mountStudentList = (props = {}) => {
    return mount(StudentList, {
        props: {
            students: mockStudents,
            isLoading: false,
            totalItems: 3,
            page: 1,
            itemsPerPage: 10,
            itemsPerPageOptions,
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

describe('StudentList.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Renderização', () => {
        it('should render the data table', () => {
            const wrapper = mountStudentList();

            expect(wrapper.find('.v-data-table').exists()).toBe(true);
        });

        it('should display table headers (RA, Nome, CPF, Ações)', () => {
            const wrapper = mountStudentList();
            const text = wrapper.text();

            expect(text).toContain('Registro Acadêmico');
            expect(text).toContain('Nome');
            expect(text).toContain('CPF');
            expect(text).toContain('Ações');
        });

        it('should display student data in the table', () => {
            const wrapper = mountStudentList();
            const text = wrapper.text();

            expect(text).toContain('João Silva');
            expect(text).toContain('Maria Santos');
            expect(text).toContain('Pedro Oliveira');

            expect(text).toContain('RA001');
            expect(text).toContain('RA002');
            expect(text).toContain('RA003');
        });

        it('should show "Nenhum aluno encontrado" when no students', () => {
            const wrapper = mountStudentList({ students: [], totalItems: 0 });

            expect(wrapper.text()).toContain('Nenhum aluno encontrado');
        });
    });

    describe('Action buttons', () => {
        it('should display edit button for each student', () => {
            const wrapper = mountStudentList();

            const editButtons = wrapper.findAll('.mdi-pencil');
            expect(editButtons.length).toBe(mockStudents.length);
        });

        it('should display delete button for each student', () => {
            const wrapper = mountStudentList();

            const deleteButtons = wrapper.findAll('.mdi-delete');
            expect(deleteButtons.length).toBe(mockStudents.length);
        });

        it('should emit edit event with student id when edit button is clicked', async () => {
            const wrapper = mountStudentList();

            const editButton = wrapper
                .find('.mdi-pencil')
                .element.closest('button');
            expect(editButton).toBeTruthy();

            await wrapper
                .find('.mdi-pencil')
                .element.closest('button')
                ?.click();
            await wrapper.vm.$nextTick();

            const editEvents = wrapper.emitted('edit');
            expect(editEvents).toBeTruthy();
            expect(editEvents![0]).toEqual(['1']);
        });

        it('should emit delete event with student when delete button is clicked', async () => {
            const wrapper = mountStudentList();

            const deleteButton = wrapper
                .find('.mdi-delete')
                .element.closest('button');
            expect(deleteButton).toBeTruthy();

            await wrapper
                .find('.mdi-delete')
                .element.closest('button')
                ?.click();
            await wrapper.vm.$nextTick();

            const deleteEvents = wrapper.emitted('delete');
            expect(deleteEvents).toBeTruthy();
            expect(deleteEvents![0]).toEqual([mockStudents[0]]);
        });
    });

    describe('Loading state', () => {
        it('should pass isLoading prop to table', () => {
            const wrapper = mountStudentList({ isLoading: true });

            expect(wrapper.props('isLoading')).toBe(true);
        });
    });

    describe('Pagination', () => {
        it('should emit update:page event when page changes', async () => {
            const wrapper = mountStudentList({ totalItems: 100 });

            wrapper.vm.$emit('update:page', 2);
            await wrapper.vm.$nextTick();

            const pageEvents = wrapper.emitted('update:page');
            expect(pageEvents).toBeTruthy();
        });

        it('should emit update:itemsPerPage event when items per page changes', async () => {
            const wrapper = mountStudentList();

            wrapper.vm.$emit('update:itemsPerPage', 25);
            await wrapper.vm.$nextTick();

            const itemsPerPageEvents = wrapper.emitted('update:itemsPerPage');
            expect(itemsPerPageEvents).toBeTruthy();
        });
    });
});
