<template>
  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Dashboard" value="dashboard" to="/"></v-list-item>
      
      <v-list-group value="Academic">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-account-school" title="Acadêmico"></v-list-item>
        </template>

        <v-list-item title="Alunos" value="students" to="/students" active-class="active-route"></v-list-item>
        <v-list-item title="Turmas" value="classes" disabled></v-list-item>
        <v-list-item title="Matrículas" value="enrollments" disabled></v-list-item>
      </v-list-group>

      <v-list-group value="Management" v-if="user?.roles?.includes('admin')">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-cog" title="Administração"></v-list-item>
        </template>

        <v-list-item title="Usuários" value="users" disabled></v-list-item>
        <v-list-item title="Relatórios" value="reports" disabled></v-list-item>
      </v-list-group>
    </v-list>

    <template v-slot:append>
      <div class="pa-2 text-center">
        <v-chip size="small" color="blue" variant="outlined">
          {{ user?.roles?.join(', ') }}
        </v-chip>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'AppSidebar',
  props: {
    modelValue: Boolean
  },
  computed: {
    drawer: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    user() {
      const authStore = useAuthStore()
      return authStore.user
    }
  }
}
</script>

<style scoped>
.active-route {
  background-color: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}
</style>