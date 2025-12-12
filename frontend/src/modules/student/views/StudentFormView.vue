<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStudentForm } from '../composables/useStudentForm';
    import StudentForm from '../components/StudentForm.vue';
    import type { createStudentSchemaType } from '../schema';

    const route = useRoute();
    const router = useRouter();
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
    const isLoadingData = ref(false);

    onMounted(async () => {
        if (isEditing.value) {
            isLoadingData.value = true;
            try {
                const student = await getStudent(studentId.value);

                if (student) {
                    studentData.value = {
                        name: student.name,
                        email: student.email,
                        cpf: student.cpf
                    };
                }
            } finally {
                isLoadingData.value = false;
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

    const handleCancel = () => {
        router.push('/students');
    };
</script>

<template>
    <v-container fluid class="pa-4 pa-md-6">
        <div class="d-flex justify-center mb-4">
            <h1 class="text-h5 text-md-h4">
                {{ isEditing ? 'Editar Aluno' : 'Cadastro de Aluno' }}
            </h1>
        </div>

        <v-card :loading="isLoadingData">
            <v-overlay
                :model-value="isLoadingData"
                contained
                class="align-center justify-center"
            >
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="64"
                ></v-progress-circular>
            </v-overlay>

            <v-card-text>
                <StudentForm
                    :loading="isLoading"
                    :validation-errors="validationErrors"
                    :initial-data="studentData"
                    @submit="handleSubmit"
                    @cancel="handleCancel"
                />
            </v-card-text>
        </v-card>
    </v-container>
</template>
