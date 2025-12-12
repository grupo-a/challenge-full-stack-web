<script setup lang="ts">
    import { ref, watch } from 'vue';
    import {
        type createStudentSchemaType,
        type updateStudentSchemaType,
        createStudentSchema,
        updateStudentSchema
    } from '../schema';

    interface Props {
        isEditing?: boolean;
        loading?: boolean;
        validationErrors?: Record<string, string[]> | null;
        initialData?: {
            name: string;
            email: string;
            cpf: string;
            ra?: string;
        } | null;
    }

    interface Emits {
        (
            e: 'submit',
            data: createStudentSchemaType | updateStudentSchemaType
        ): void;
        (e: 'cancel'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        isEditing: false,
        loading: false,
        validationErrors: null,
        initialData: null
    });

    const emit = defineEmits<Emits>();

    const form = ref({
        name: '',
        email: '',
        cpf: '',
        ra: ''
    });

    const errors = ref<Record<string, string[]>>({});

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
                form.value = {
                    name: newData.name,
                    email: newData.email,
                    cpf: newData.cpf,
                    ra: newData.ra || ''
                };
            }
        },
        { immediate: true }
    );

    const validateForm = ():
        | createStudentSchemaType
        | updateStudentSchemaType
        | null => {
        errors.value = {};

        const schema = props.isEditing
            ? updateStudentSchema
            : createStudentSchema;
        const result = schema.safeParse(form.value);

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                if (!errors.value[field]) {
                    errors.value[field] = [];
                }
                errors.value[field].push(issue.message);
            });
            return null;
        }

        return result.data;
    };

    const handleSubmit = () => {
        const validData = validateForm();

        if (validData) {
            emit('submit', validData);
        }
    };
</script>

<template>
    <v-form @submit.prevent="handleSubmit">
        <v-row>
            <v-col v-if="isEditing" cols="12" md="6">
                <v-text-field
                    v-model="form.ra"
                    label="RA"
                    disabled
                    variant="outlined"
                    bg-color="grey-lighten-4"
                    data-testid="ra-input"
                ></v-text-field>
            </v-col>

            <v-col cols="12" :md="isEditing ? 6 : 12">
                <v-text-field
                    v-model="form.cpf"
                    label="CPF"
                    :disabled="isEditing"
                    :variant="isEditing ? 'outlined' : 'filled'"
                    :bg-color="isEditing ? 'grey-lighten-4' : undefined"
                    :error-messages="errors.cpf"
                    required
                    data-testid="cpf-input"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field
                    v-model="form.name"
                    label="Nome"
                    :error-messages="errors.name"
                    required
                    data-testid="name-input"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field
                    v-model="form.email"
                    label="Email"
                    type="email"
                    :error-messages="errors.email"
                    required
                    data-testid="email-input"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" class="d-flex justify-end ga-4">
                <v-btn
                    color="grey-darken-1"
                    variant="outlined"
                    :disabled="props.loading"
                    data-testid="cancel-button"
                    @click="emit('cancel')"
                >
                    Cancelar
                </v-btn>

                <v-btn
                    color="primary"
                    type="submit"
                    :loading="props.loading"
                    data-testid="save-button"
                >
                    Salvar
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
