<template>
    <header>
        <RouterLink class="active" to="/">Cadastrar</RouterLink>
        <RouterLink to="/consult-students">Consultar</RouterLink>
    </header>

    <div id="page-create-student">
        <div class="content">
            <form @submit.prevent="handleSubmit">
                <h1>Cadastro de alunos</h1>

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
                            <input type="text" name="ra" id="ra" required v-model="formData.ra" />
                        </div>
                        <div class="field">
                            <label for="cpf">CPF</label>
                            <input type="text" name="cpf" id="cpf" required v-model="formData.cpf" />
                        </div>
                    </div>
                </fieldset>

                <button type="submit">Cadastrar aluno</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { ICreateStudentForm } from '@/types/Student'
import { api } from '@/services/api'

const router = useRouter()

const formData = reactive<ICreateStudentForm>({
    name: '',
    email: '',
    ra: '',
    cpf: '',
})

async function handleSubmit(): Promise<void> {
    const { name, email, ra, cpf } = formData

    const data = {
        name,
        email,
        ra,
        cpf,
    }

    try {
        await api.post('students', data)
        alert('Aluno cadastrado com sucesso!')

        router.push('/consult-students')
    } catch (error) {
        console.error(error)
        alert('Ocorreu um erro, tente novamente!')
    }
}
</script>

<style scoped>
#page-create-student {
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

#page-create-student form {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

#page-create-student form h1 {
    font-size: 36px;
}

#page-create-student form fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;
}

#page-create-student form legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

#page-create-student form legend h2 {
    font-size: 24px;
}

#page-create-student form .field-group {
    flex: 1;
    display: flex;
}

#page-create-student form .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
}

#page-create-student form .field input[type='text'],
#page-create-student form .field input[type='number'],
#page-create-student form .field textarea {
    flex: 1;
    background: #fff;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    padding: 16px 24px;
    font-size: 16px;
}

#page-create-student form .field select {
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

#page-create-student form .field input::placeholder {
    color: #a0a0b2;
}

#page-create-student form .field label {
    font-size: 14px;
    margin-bottom: 8px;
}

#page-create-student form .field :disabled {
    cursor: not-allowed;
}

#page-create-student form .field-group .field + .field {
    margin-left: 24px;
}

#page-create-student form .field-group input + input {
    margin-left: 24px;
}

#page-create-student form button {
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

#page-create-student form button:hover {
    background: #0069d9;
}
</style>
