<template>
  <v-app>
    <Layout v-if="showLayout" />
    <!-- App main content -->
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Layout from './components/Layout'

  export default {
    components: {
      Layout
    },
    data() {
      return {
        showLayout: false
      }
    },
    beforeMount() {
      if (localStorage.getItem('token') !== null) {
        this.showLayout = true
      }
    }
  }
</script>

<!-- Basic CSS -->
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