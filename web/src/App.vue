<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style>
* {
    margin: 0;
    padding: 0;
}

body {
    background: #f0f0f5;
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
}

body,
input,
button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    color: var(--title-color);
    font-family: Ubuntu;
}
</style>
