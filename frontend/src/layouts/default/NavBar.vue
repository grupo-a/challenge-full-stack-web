<script lang="ts" >
import Menu from '@/components/Menu.vue';

export default {
  data() {
    return {
      showElementAbove800: true,
      showElementBelow800: false,
      drawer: true,
    };
  },
  created() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      const windowWidth = window.innerWidth;
      this.showElementAbove800 = windowWidth > 1264;
      this.showElementBelow800 = windowWidth <= 1264;
    },
  },
};

</script>

<template>
  <div v-if="showElementBelow800">
    <v-app-bar v-show="showElementBelow800" flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
  </div>

  <v-navigation-drawer v-model="drawer" app clipped class="border-r">
    <Menu />
  </v-navigation-drawer>
</template>
