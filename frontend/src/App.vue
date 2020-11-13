<template>
  <v-app id="inspire">
    <sidebar-menu :drawer="drawer" />
    <app-bar :drawer="drawer" @drawer-menu="toggleMenu" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import vue from 'vue';
import SidebarMenu from './components/SidebarMenu.vue';
import AppBar from './components/AppBar.vue';

export default vue.extend({
  name: 'app',
  data() {
    return {
      drawer: true,
    };
  },
  components: {
    SidebarMenu,
    AppBar,
  },
  methods: {
    toggleMenu(drawer: boolean) {
      this.drawer = drawer;
    },
  },
});
</script>
