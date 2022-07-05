<template>
  <v-card height="100%">
    <v-app
      dense
      elevation="4"
      flat
      outlined
    >
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-card color="grey darken-1">
          <v-card-title class="bold white--text text-center">Módulo Acadêmico</v-card-title>
        </v-card>

        <v-btn color="grey lighten-2" block to="/">Alunos</v-btn>
      </v-navigation-drawer>

      <v-app-bar app color="grey lighten-2">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer />
        <v-toolbar-title>Consulta de Alunos</v-toolbar-title>
        <v-spacer />
      </v-app-bar>
      
      <v-main>
        <br />
        <router-view />
      </v-main>
    </v-app>
  </v-card>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      drawer: null
    }
  },
};
</script>