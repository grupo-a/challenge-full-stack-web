<template>
    <div id="page-user-login">
        <div class="content">
            <form @submit.prevent="handleSubmit">
                <h1>Login</h1>

                <fieldset>
                    <legend>
                        <h2>Digite seu email e senha</h2>
                    </legend>

                    <div class="field">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required v-model="formData.email" />
                    </div>

                    <div class="field">
                        <label for="password">Senha</label>
                        <input type="password" name="password" id="password" required v-model="formData.password" />
                    </div>
                </fieldset>

                <div class="buttons-container">
                    <RouterLink to="/register"><button type="button">Cadastrar usuário</button></RouterLink>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { httpApi } from '@/services/api'
import type { IUserLogin } from '@/types/User'
import { AxiosError } from 'axios'
// import { useAuth } from '@/stores/auth'

const api = httpApi()
const router = useRouter()

const formData = reactive<IUserLogin>({
    email: '',
    password: '',
})

// const auth = useAuth()

async function handleSubmit() {
    try {
        const { data } = await api.post('users/login', formData)
        localStorage.setItem('token', data.token)
        // auth.setToken(data.token)

        router.push('/consult-students')
    } catch (error) {
        console.error(error)

        if (error instanceof AxiosError) alert(`Erro ao fazer login:\n\n${JSON.stringify(error.response?.data)}`)
        else alert(`Erro inesperado ao fazer login`)
    }
}
</script>

<style scoped>
#page-user-login {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

#page-user-login form {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

#page-user-login form h1 {
    font-size: 36px;
}

#page-user-login form fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;
}

#page-user-login form legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

#page-user-login form legend h2 {
    font-size: 24px;
}

#page-user-login form .field-group {
    flex: 1;
    display: flex;
}

#page-user-login form .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
}

#page-user-login form .field input[type='text'],
#page-user-login form .field input[type='email'],
#page-user-login form .field input[type='password'] {
    flex: 1;
    background: #fff;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    padding: 16px 24px;
    font-size: 16px;
}

#page-user-login form .field input::placeholder {
    color: #a0a0b2;
}

#page-user-login form .field label {
    font-size: 14px;
    margin-bottom: 8px;
}

#page-user-login form .field :disabled {
    cursor: not-allowed;
}

#page-user-login form .field-group .field + .field {
    margin-left: 24px;
}

#page-user-login form .field-group input + input {
    margin-left: 24px;
}

#page-user-login form div.buttons-container {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
}

#page-user-login form button {
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

#page-user-login form a button {
    background: #00a65a;
}

#page-user-login form button:hover {
    background: #0069d9;
}

#page-user-login form a button:hover {
    background: rgb(0, 131, 72);
}
</style>
