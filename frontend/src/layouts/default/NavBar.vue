<script lang="ts" setup>
import Menu from '@/components/Menu.vue';

import { ref } from 'vue';

const drawer = ref(true);
</script>

<template>

  <v-app-bar app dark>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    class="border-r"
  >
    <Menu />
  </v-navigation-drawer>
</template>



