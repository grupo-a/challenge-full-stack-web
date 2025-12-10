<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter

const route = useRoute();
const router = useRouter(); //Router instance

const pageTitle = computed(() => {
  if (route.name === 'student-create' || route.name === 'student-edit') {
    return 'Cadastro de alunos';
  }
  return 'Consulta de alunos';
});

//LOGOUT FUNCTION
const handleLogout = () => {
  localStorage.removeItem('user_token'); //Remove the token
  window.location.href = '/login'; //Force reload to clear states
};
</script>

<template>
  <v-app>
    <v-navigation-drawer permanent v-if="route.name !== 'login'">
      
      <div class="d-flex justify-center align-center my-4">
        <img 
          src="../src/assets/logo-mais-a-educacao.svg" 
          alt="Group Logo" 
          height="50" 
        />
      </div>

      <v-sheet color="grey-lighten-1" class="pa-2 pl-4">
        <span class="text-subtitle-2 font-weight-bold text-white">
          Módulo Acadêmico
        </span>
      </v-sheet>

      <v-divider></v-divider>
      
      <v-list density="compact" nav>
        <v-list-item 
          to="/students" 
          link 
          prepend-icon="mdi-account-multiple-outline" 
          title="Alunos"
          active-color="grey-darken-3"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red-lighten-1" variant="text" @click="handleLogout">
            <v-icon start>mdi-logout</v-icon>
            Sair
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="white" elevation="1" v-if="route.name !== 'login'">
      <v-app-bar-title class="text-body-1">
        {{ pageTitle }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container>
        <router-view></router-view> 
      </v-container>
    </v-main>
  </v-app>
</template>