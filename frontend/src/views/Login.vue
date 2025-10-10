<template>
  <v-app>
    <v-main class="bg-blue-lighten-5">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center"> 
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card elevation="8" class="pa-6">
              <v-card-title class="text-center text-h4 font-weight-bold mb-4">
                <v-icon size="40" color="blue-darken-2" class="mr-2">mdi-account</v-icon>
                A+ Educação
              </v-card-title>
              
              <v-card-subtitle class="text-center text-h6 mb-6">
                Sistema de Gerenciamento
              </v-card-subtitle>

              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="credentials.username"
                  label="Usuário"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  required
                  class="mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="credentials.password"
                  label="Senha"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  type="password"
                  required
                  class="mb-2"
                ></v-text-field>

                <v-alert
                  v-if="error"
                  type="error"
                  density="compact"
                  class="mb-4"
                >
                  {{ error }}
                </v-alert>

                <v-btn
                  type="submit"
                  color="blue-darken-2"
                  size="large"
                  block
                  :loading="loading"
                >
                  <v-icon left>mdi-login</v-icon>
                  Entrar
                </v-btn>
              </v-form>

              <v-divider class="my-6"></v-divider>

              <div class="text-center">
                <p class="text-caption text-grey">
                  Use: <strong>admin_teste</strong> / <strong>admin123</strong>
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LoginView',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''

      const authStore = useAuthStore()
      const result = await authStore.login(this.credentials)

      if (result.success) {
        this.$router.push('/')
      } else {
        this.error = result.message || 'Erro ao fazer login'
      }

      this.loading = false
    }
  }
}
</script>