<template>
    <HeaderBar active="create" />

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
                        <input type="email" name="email" id="email" required v-model="formData.email" />
                    </div>

                    <div class="field-group">
                        <div class="field">
                            <label for="ra">Registro do Aluno</label>
                            <input type="number" name="ra" id="ra" required v-model="formData.ra" />
                        </div>
                        <div class="field">
                            <label for="cpf">CPF</label>
                            <input
                                @input="formatCPF"
                                v-model="formattedCPF"
                                type="text"
                                name="cpf"
                                id="cpf"
                                maxlength="14"
                                required
                            />
                        </div>
                    </div>
                </fieldset>

                <button type="submit">Cadastrar aluno</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { ICreateStudentForm } from '@/types/Student'
import { httpApi } from '@/services/api'
import HeaderBar from '@/components/HeaderBar.vue'
import { AxiosError } from 'axios'

const api = httpApi()
const router = useRouter()

const formData = reactive<ICreateStudentForm>({
    name: '',
    email: '',
    ra: '',
    cpf: '',
})

async function handleSubmit() {
    const { name, email, ra, cpf } = formData

    const data = {
        name,
        email,
        ra: String(ra),
        cpf,
    }

    try {
        await api.post('students', data)
        alert('Aluno cadastrado com sucesso!')

        router.push('/consult-students')
    } catch (error) {
        console.error(error)

        if (error instanceof AxiosError) alert(`Erro ao criar o aluno:\n\n${JSON.stringify(error.response?.data)}`)
        else alert(`Erro inesperado ao criar o aluno`)
    }
}

function formatCPF(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value.replace(/\D/g, '')

    if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11)
    }

    if (inputValue.length > 9) {
        inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else if (inputValue.length > 6) {
        inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
    } else if (inputValue.length > 3) {
        inputValue = inputValue.replace(/(\d{3})(\d{3})/, '$1.$2')
    }

    formData.cpf = inputValue
}

const formattedCPF = computed(() => {
    return formData.cpf
})
</script>

<style scoped>
#page-create-student {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
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
#page-create-student form .field input[type='email'],
#page-create-student form .field input[type='password'] {
    flex: 1;
    background: #fff;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    padding: 16px 24px;
    font-size: 16px;
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
