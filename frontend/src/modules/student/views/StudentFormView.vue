<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStudentForm } from '../composables/useStudentForm';
    import StudentForm from '../components/StudentForm.vue';
    import type { createStudentSchemaType } from '../schema';

    const route = useRoute();
    const studentId = computed(() => route.params.id as string);
    const isEditing = computed(() => !!studentId.value);

    console.log(isEditing.value ? 'Editing student' : 'Creating new student');

    const {
        handleCreateStudent,
        handleUpdateStudent,
        getStudent,
        isLoading,
        validationErrors
    } = useStudentForm();

    const studentData = ref<createStudentSchemaType | null>(null);

    onMounted(async () => {
        console.log('StudentFormView mounted');
        if (isEditing.value) {
            const student = await getStudent(studentId.value);

            if (student) {
                studentData.value = {
                    name: student.name,
                    email: student.email,
                    cpf: student.cpf
                };
            }
        }
    });

    const handleSubmit = async (data: createStudentSchemaType) => {
        if (isEditing.value) {
            await handleUpdateStudent(studentId.value, data);
        } else {
            await handleCreateStudent(data);
        }
    };
</script>

<template>
    <v-container>
        <h1 class="text-h4 mb-4">
            {{ isEditing ? 'Editar Aluno' : 'Cadastro de Aluno' }}
        </h1>

        <v-card>
            <v-card-text>
                <StudentForm
                    :loading="isLoading"
                    :validation-errors="validationErrors"
                    :initial-data="studentData"
                    @submit="handleSubmit"
                />
            </v-card-text>
        </v-card>
    </v-container>
</template>
