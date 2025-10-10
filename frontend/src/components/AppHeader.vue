<template>
  <v-app-bar color="blue-darken-2" density="compact">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    
    <v-app-bar-title>
      <span class="font-weight-bold">A+ Educação</span>
      <span class="text-caption ml-2">Sistema Acadêmico</span>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu location="bottom end">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Usuário: {{ user?.username }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Perfil: {{ user?.roles?.join(', ') }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout">
          <v-list-item-title class="text-error">
            <v-icon icon="mdi-logout" size="small" class="mr-2"></v-icon>
            Sair
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'AppHeader',
  emits: ['toggle-drawer'],
  computed: {
    user() {
      const authStore = useAuthStore()
      return authStore.user
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit('toggle-drawer')
    },
    logout() {
      const authStore = useAuthStore()
      authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>