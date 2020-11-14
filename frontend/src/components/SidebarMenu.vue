<template>
  <v-navigation-drawer :value="drawer" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Módulo Acadêmico
        </v-list-item-title>
        <v-list-item-subtitle>
          GrupoA
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item v-for="item in items" :key="item.title" link :to="{ name: 'student.index' }">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SidebarMenu',
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      items: [
        {
          title: 'Alunos',
          icon: 'mdi-account',
        },
      ],
    };
  },
});
</script>
