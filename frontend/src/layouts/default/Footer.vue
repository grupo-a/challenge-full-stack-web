<script lang="ts" setup>
  const date = new Date().getFullYear()
</script>

<template>
  <footer>
      <v-footer
      class="border-t"
        app
      >
        <v-col
          class="text-end"
          cols="12"
        >
          <span style="color: #757575;" >&copy; {{ date }} Todos os direitos reservados.</span>
        </v-col>
      </v-footer>
    </footer>
</template>
