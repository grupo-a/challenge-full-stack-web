<template>
    <div id="page-create-user">
        <div class="content">
            <form @submit.prevent="handleSubmit">
                <h1>Cadastrar usuário</h1>

                <fieldset>
                    <legend>
                        <h2>Dados do usuário</h2>
                    </legend>

                    <div class="field">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" required v-model="formData.username" />
                    </div>

                    <div class="field">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required v-model="formData.email" />
                    </div>

                    <div class="field-group">
                        <div class="field">
                            <label for="password">Senha</label>
                            <input type="password" name="password" id="password" required v-model="formData.password" />
                        </div>
                        <div className="field">
                            <label htmlFor="role">Função</label>
                            <select name="role" id="role" required v-model="formData.role">
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <div class="buttons-container">
                    <RouterLink to="/"><button type="button">Cancelar</button></RouterLink>
                    <button type="submit">Cadastrar usuário</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { httpApi } from '@/services/api'
import type { ICreateUser } from '@/types/User'
import { AxiosError } from 'axios'

const api = httpApi()
const router = useRouter()

const formData = reactive<ICreateUser>({
    username: '',
    email: '',
    password: '',
})

async function handleSubmit() {
    const { username, email, password, role } = formData

    const data = {
        username,
        email,
        password,
        role: role ?? 'USER',
    }

    try {
        await api.post('users', data)
        alert('Usuário cadastrado com sucesso!')

        router.push('/')
    } catch (error) {
        console.error(error)

        if (error instanceof AxiosError) alert(`Erro ao criar o usuário:\n\n${JSON.stringify(error.response?.data)}`)
        else alert(`Erro inesperado ao criar o usuário`)
    }
}
</script>

<style scoped>
#page-create-user {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

#page-create-user form {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

#page-create-user form h1 {
    font-size: 36px;
}

#page-create-user form fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;
}

#page-create-user form legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

#page-create-user form legend h2 {
    font-size: 24px;
}

#page-create-user form .field-group {
    flex: 1;
    display: flex;
}

#page-create-user form .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
}

#page-create-user form .field input[type='text'],
#page-create-user form .field input[type='email'],
#page-create-user form .field input[type='password'] {
    flex: 1;
    background: #fff;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    padding: 16px 24px;
    font-size: 16px;
}

#page-create-user form .field select {
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

#page-create-user form .field input::placeholder {
    color: #a0a0b2;
}

#page-create-user form .field label {
    font-size: 14px;
    margin-bottom: 8px;
}

#page-create-user form .field :disabled {
    cursor: not-allowed;
}

#page-create-user form .field-group .field + .field {
    margin-left: 24px;
}

#page-create-user form .field-group input + input {
    margin-left: 24px;
}

#page-create-user form div.buttons-container {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
}

#page-create-user form button {
    width: 200px;
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

#page-create-user form a button {
    background: #fff;
    border: 1px solid #000;
    color: #000;
}

#page-create-user form button:hover {
    background: #0069d9;
}

#page-create-user form a button:hover {
    background: #f0f0f0;
    border: 1px solid #000;
    color: #000;
}
</style>
