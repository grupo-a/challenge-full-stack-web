<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-5" elevation="4">
      <div class="text-center mb-6">
        <h2 class="text-h5 font-weight-bold">Acesso ao Sistema</h2>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="E-mail"
          variant="outlined"
          prepend-inner-icon="mdi-email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
        ></v-text-field>

        <v-btn type="submit" block color="primary" size="large" :loading="loading">
          Entrar
        </v-btn>
        
        <v-alert v-if="error" type="error" class="mt-4" density="compact">
            {{ error }}
        </v-alert>
      </v-form>
      
      <div class="text-center mt-4">
          <v-btn variant="text" size="small" @click="handleRegister">Criar conta de teste</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value
    });

    //SAVE TOKEN in localStorage
    const token = response.data.token;
    localStorage.setItem('user_token', token);

    //Configure Axios to use this token globally
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //Go to Students page
    router.push('/students');

  } catch (err: any) {
    error.value = "E-mail ou senha inválidos.";
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
    //Quick helper to create a user for you to test
    try {
        await axios.post('http://localhost:3000/auth/register', {
            name: 'Admin',
            email: email.value,
            password: password.value
        });
        alert("Usuário criado! Agora faça login.");
    } catch(e) { alert("Erro ao criar usuário"); }
}
</script>