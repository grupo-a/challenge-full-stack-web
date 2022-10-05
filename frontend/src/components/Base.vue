<script>
export default {
  name: "BaseView",
};
</script>

<template>
  <v-navigation-drawer app absolute dark permanent>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar class="white">
          <v-img width="64" height="30" src="../assets/logo.svg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Módulo Acadêmico</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link to="/students">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>
