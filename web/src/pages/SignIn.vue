<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="400">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-text-field label="Email" v-model="email" />
        <v-text-field label="Password" v-model="password" type="password" />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="login">Sign In</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-snackbar v-model="snackbarVisible" :timeout="5000" color="error">
    {{ error }}
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/plugins/axios";

const email = ref("");
const password = ref("");
const error = ref("");
const snackbarVisible = ref(false);
const router = useRouter();

const login = async () => {
  error.value = "";

  if (email.value && password.value) {
    try {
      const response = await axios.post("/auth/signin", {
        email: email.value,
        password: password.value,
      });

      console.log("teste");

      if (response.data.accessToken) {
        localStorage.setItem("auth_token", response.data.accessToken);

        router.push("/dashboard");
      } else {
        error.value = "Autenticação falhou. Tente novamente.";
        snackbarVisible.value = true;
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        error.value = "Credenciais inválidas. Verifique seu email e senha.";
      } else {
        error.value = "Erro ao conectar com a API. Tente novamente.";
      }
      snackbarVisible.value = true;
    }
  } else {
    error.value = "Por favor, preencha ambos os campos.";
    snackbarVisible.value = true;
  }
};
</script>
