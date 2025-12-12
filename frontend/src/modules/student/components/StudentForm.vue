<script setup lang="ts">
    import { ref, watch } from 'vue';
    import {
        type createStudentSchemaType,
        createStudentSchema
    } from '../schema';

    interface Props {
        loading?: boolean;
        validationErrors?: Record<string, string[]> | null;
        initialData?: createStudentSchemaType | null;
    }

    interface Emits {
        submit: [data: createStudentSchemaType];
        cancel: [];
    }

    const props = withDefaults(defineProps<Props>(), {
        loading: false,
        validationErrors: null,
        initialData: null
    });

    const emit = defineEmits<Emits>();

    const studentForm = ref({
        name: '',
        email: '',
        cpf: ''
    });

    const errors = ref<{
        name?: string[];
        email?: string[];
        cpf?: string[];
    }>({});

    watch(
        () => props.validationErrors,
        (newErrors) => {
            if (newErrors) {
                errors.value = newErrors;
            }
        }
    );

    watch(
        () => props.initialData,
        (newData) => {
            if (newData) {
                studentForm.value = { ...newData };
            }
        },
        { immediate: true }
    );

    const validateForm = (): boolean => {
        const result = createStudentSchema.safeParse(studentForm.value);

        console.log('Validation result:', result);

        if (!props.validationErrors) {
            errors.value = {};
        }

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as 'name' | 'email' | 'cpf';
                if (!errors.value[field]) {
                    errors.value[field] = [];
                }
                errors.value[field]!.push(issue.message);
            });
            return false;
        }

        if (!props.validationErrors) {
            errors.value = {};
        }

        console.log('Form is valid');

        return true;
    };

    const handleSubmit = async () => {
        console.log('Submitting form with data:', studentForm.value);
        if (props.validationErrors) {
            errors.value = {};
        }

        console.log('Validating form...');

        if (!validateForm()) return;

        console.log('Emitting submit event with data:', studentForm.value);

        emit('submit', studentForm.value);
    };
</script>

<template>
    <v-form @submit.prevent="handleSubmit">
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="studentForm.name"
                    label="Nome"
                    :error-messages="errors.name"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field
                    v-model="studentForm.email"
                    label="Email"
                    type="email"
                    :error-messages="errors.email"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field
                    v-model="studentForm.cpf"
                    label="CPF"
                    :error-messages="errors.cpf"
                    required
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" class="d-flex justify-end ga-4">
                <v-btn
                    color="grey-darken-1"
                    variant="outlined"
                    :disabled="props.loading"
                    @click="emit('cancel')"
                >
                    Cancelar
                </v-btn>

                <v-btn color="primary" type="submit" :loading="props.loading">
                    Salvar
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
