<template>
    <HeaderBar active="" />

    <div id="page-change-students">
        <div class="content">
            <form @submit.prevent="handleSubmit">
                <h1>Atualizar aluno</h1>

                <fieldset>
                    <legend>
                        <h2>Dados do aluno</h2>
                    </legend>

                    <div class="field">
                        <label for="name">Nome</label>
                        <input type="text" name="name" id="name" required v-model="formData.name" />
                    </div>

                    <div class="field">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required v-model="formData.email" />
                    </div>

                    <div class="field-group">
                        <div class="field">
                            <label for="ra">Registro do Aluno</label>
                            <input type="number" name="ra" id="ra" required disabled v-model="student.ra" />
                        </div>
                        <div class="field">
                            <label for="cpf">CPF</label>
                            <input type="text" name="cpf" id="cpf" required disabled v-model="student.cpf" />
                        </div>
                    </div>
                </fieldset>

                <button type="submit">Atualizar aluno</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { httpApi } from '@/services/api'
import type { IStudent, IUpdateStudentForm } from '@/types/Student'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'
import { AxiosError } from 'axios'

const api = httpApi()
const route = useRoute()
const router = useRouter()

const formData = reactive<IUpdateStudentForm>({
    name: '',
    email: '',
})

const student = reactive<IStudent>({
    id: '',
    name: '',
    email: '',
    ra: '',
    cpf: '',
    createdAt: new Date(),
    updatedAt: new Date(),
})

onMounted(async () => {
    try {
        const response = await api.get(`students/${route.params.id}`)

        student.id = response.data.id
        student.name = response.data.name
        student.email = response.data.email
        student.ra = response.data.ra
        student.cpf = response.data.cpf
        student.createdAt = response.data.createdAt
        student.updatedAt = response.data.updatedAt

        formData.name = student.name
        formData.email = student.email
    } catch (error) {
        console.error(error)

        if (error instanceof AxiosError)
            alert(`Erro ao buscar os dados do aluno:\n\n${JSON.stringify(error.response?.data)}`)
        else alert(`Erro inesperado ao buscar os dados do aluno`)
    }
})

async function handleSubmit() {
    const data: IUpdateStudentForm = {
        name: formData.name,
        email: formData.email,
    }

    try {
        await api.put(`students/${route.params.id}`, data)

        alert('Aluno atualizado com sucesso!')

        router.push('/consult-students')
    } catch (error) {
        console.error(error)

        if (error instanceof AxiosError) alert(`Erro ao atualizar o aluno:\n\n${JSON.stringify(error.response?.data)}`)
        else alert(`Erro inesperado ao atualizar o aluno`)
    }
}
</script>

<style scoped>
#page-change-students {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

#page-change-students form {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

#page-change-students form h1 {
    font-size: 36px;
}

#page-change-students form fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;
}

#page-change-students form legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

#page-change-students form legend h2 {
    font-size: 24px;
}

#page-change-students form .field-group {
    flex: 1;
    display: flex;
}

#page-change-students form .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
}

#page-change-students form .field input[type='text'],
#page-change-students form .field input[type='number'],
#page-change-students form .field input[type='email'],
#page-change-students form .field input[type='password'],
#page-change-students form .field textarea {
    flex: 1;
    background: #fff;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    padding: 16px 24px;
    font-size: 16px;
}

#page-change-students form .field select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #ced4da;
    padding: 16px 24px;
    font-size: 16px;
    color: #000;
}

#page-change-students form .field input::placeholder {
    color: #a0a0b2;
}

#page-change-students form .field label {
    font-size: 14px;
    margin-bottom: 8px;
}

#page-change-students form .field :disabled {
    cursor: not-allowed;
}

#page-change-students form .field-group .field + .field {
    margin-left: 24px;
}

#page-change-students form .field-group input + input {
    margin-left: 24px;
}

#page-change-students form button {
    width: 260px;
    height: 56px;
    background: #007bff;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    margin-top: 40px;
    transition: background-color 0.2s;
    cursor: pointer;
}

#page-change-students form button:hover {
    background: #0069d9;
}
</style>
