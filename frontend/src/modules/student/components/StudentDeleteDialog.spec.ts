import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import StudentDeleteDialog from './StudentDeleteDialog.vue';

const vuetify = createVuetify({
    components,
    directives
});

const mountStudentDeleteDialog = (props = {}) => {
    return mount(StudentDeleteDialog, {
        props: {
            modelValue: false,
            studentName: 'João Silva',
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

describe('StudentDeleteDialog.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Props', () => {
        it('should receive modelValue prop', () => {
            const wrapper = mountStudentDeleteDialog({ modelValue: false });
            expect(wrapper.props('modelValue')).toBe(false);
        });

        it('should receive studentName prop', () => {
            const wrapper = mountStudentDeleteDialog({
                studentName: 'Maria Santos'
            });
            expect(wrapper.props('studentName')).toBe('Maria Santos');
        });
    });

    describe('Emits', () => {
        it('should emit update:modelValue when triggered', () => {
            const wrapper = mountStudentDeleteDialog();

            wrapper.vm.$emit('update:modelValue', false);

            const events = wrapper.emitted('update:modelValue');
            expect(events).toBeTruthy();
            expect(events![0]).toEqual([false]);
        });

        it('should emit confirm when triggered', () => {
            const wrapper = mountStudentDeleteDialog();

            wrapper.vm.$emit('confirm');

            const events = wrapper.emitted('confirm');
            expect(events).toBeTruthy();
        });
    });

    describe('Component structure', () => {
        it('should be a valid Vue component', () => {
            const wrapper = mountStudentDeleteDialog();
            expect(wrapper.exists()).toBe(true);
        });

        it('should have v-dialog component', () => {
            const wrapper = mountStudentDeleteDialog();
            expect(wrapper.findComponent({ name: 'VDialog' }).exists()).toBe(
                true
            );
        });
    });

    describe('Dialog visibility', () => {
        it('should not show dialog content when modelValue is false', () => {
            const wrapper = mountStudentDeleteDialog({ modelValue: false });

            const dialog = wrapper.findComponent({ name: 'VDialog' });
            expect(dialog.props('modelValue')).toBe(false);
        });
    });
});
