<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
import Login from '@/components/auth/Login.vue'
import { useUserStore } from '../../store/user'

import { ref } from 'vue'

const user = useUserStore()

const login = ref(false)

const toggleLogin = () => {
  login.value = !login.value
}

</script>

<template>
  <v-app-bar flat class="border-b d-flex">
    <v-app-bar-title>

      <Logo />
    </v-app-bar-title>
    <template v-slot:append>
      <h5>{{ user.name }}</h5>
      <v-btn @click="login = true" class="ma-2" size="x-large" color="#6B6765" icon="mdi-account-circle"></v-btn>
    </template>
  </v-app-bar>
  <Login :value="login" :toggleLogin="toggleLogin" />
</template>


