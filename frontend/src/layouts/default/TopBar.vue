<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
</script>

<template>
  <v-app-bar flat class="border-b d-flex">
    <v-app-bar-title>
      <Logo />
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn
        class="ma-2"
        size="x-large"
        color="#6B6765"
        icon="mdi-account-circle"
      ></v-btn>
    </template>
  </v-app-bar>
</template>


