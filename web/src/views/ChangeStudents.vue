<template>
    <header>
        <RouterLink to="/">Cadastrar</RouterLink>
        <RouterLink to="/consult-students">Consultar</RouterLink>
    </header>

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
                        <input type="text" name="email" id="email" required v-model="formData.email" />
                    </div>

                    <div class="field-group">
                        <div class="field">
                            <label for="ra">Registro do Aluno</label>
                            <input type="text" name="ra" id="ra" required disabled v-model="student.ra" />
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
import { api } from '@/services/api'
import type { IStudent, IUpdateStudentForm } from '@/types/Student'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
    // const response = await api.get(`students/${route.params.id}`)
    student.id = '1'
    student.name = 'Joao'
    student.email = 'joao@test.com'
    student.ra = '111111111'
    student.cpf = '111.111.111-11'
    student.createdAt = new Date()
    student.updatedAt = new Date()

    formData.name = student.name
    formData.email = student.email
})

async function handleSubmit() {
    const data: IUpdateStudentForm = {
        name: formData.name,
        email: formData.email,
    }

    try {
        // await api.put(`students/${route.params.id}`, data)
        console.log('data', data)
        alert('Aluno atualizado com sucesso!')
        router.push('/consult-students')
    } catch (error) {
        console.error(error)
        alert('Ocorreu um erro, tente novamente!')
    }
}
</script>

<style scoped>
#page-change-students {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #007bff;
    height: 65px;
    padding-inline-start: 10%;
}

header a {
    color: rgb(255, 255, 255, 0.5);
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 10px;
}

header .active {
    color: rgb(255, 255, 255, 1);
}

header a:hover {
    color: rgb(255, 255, 255, 1);
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
