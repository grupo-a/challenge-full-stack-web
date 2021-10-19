<template>
<v-app id="app">
  <router-view />
</v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Inter', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #E9E9E9;
}

html {
  overflow-y: auto
}

.no-uppercase {
  text-transform: none !important;
  letter-spacing: 0em !important;
}
</style>
