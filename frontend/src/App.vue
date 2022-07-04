<template>
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
      <v-card color="red darken-1">
        <v-card-title class="bold white--text">Módulo Acadêmico</v-card-title>
      </v-card>

      <v-list color="grey lighten-3">
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-text>Consulta de Alunos</v-text>
      <v-spacer />
    </v-app-bar>
    
    <v-main>
      <br />
      <router-view />
    </v-main>
  </v-app>
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