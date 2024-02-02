<template>
  <v-list :lines="false" density="compact" nav>
    <v-list-item v-for="(item, i) in menuItens" :key="i" :value="item" :active="item.active" color="primary">
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title v-text="item.title"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const menuItens = ref([
  { icon: 'mdi-account', title: 'Alunos', active: true },
])

function selectItem(item: string) {
  console.log(item)
}

</script>
