<template>
    <div>
        <v-navigation-drawer app>
        <div class="logo">
            <img src="../assets/logo.png" />
        </div>

        <!-- Navigation menu -->
        <v-list
            dense
            nav
        >
            <v-list-item to="/">
            <v-list-item-content>
                <v-list-item-title>Consulta de alunos</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item to="/cadastro">
            <v-list-item-content>
                <v-list-item-title>Cadastro de alunos</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>

        </v-navigation-drawer>

        <!-- App Bar -->
        <v-app-bar app>
        <v-toolbar-title>Módulo acadêmico</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<style scoped>
  .logo {
    width: 100%;
    padding: 10px;
    text-align: center;
  }
  .logo img {
    max-height: 50px;
  }
</style>