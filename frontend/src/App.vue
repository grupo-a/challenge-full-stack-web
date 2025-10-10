<template>
  <v-app>
    <AppHeader @toggle-drawer="drawer = !drawer" />
    
    <AppSidebar v-model="drawer" />
    
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSideBar.vue'
import { useAuthStore } from './stores/auth.js'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar
  },
  data() {
    return {
      drawer: false
    }
  },
  mounted() {
    const authStore = useAuthStore()
    authStore.initialize()
  }
}
</script>