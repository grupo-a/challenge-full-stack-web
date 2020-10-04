<template>
  <v-app>
    <Navigation />
    <v-main>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navigation from "./components/Navigation.vue";
import { DARK_THEME_STORAGE_KEY } from "./constants";

export default Vue.extend({
  name: "App",
  components: {
    Navigation
  },
  mounted() {
    const disableDark = localStorage.getItem(DARK_THEME_STORAGE_KEY);
    if (disableDark === "true") {
      this.$vuetify.theme.dark = false;
    }
  },
  watch: {
    "$vuetify.theme.dark": (value: string) => {
      localStorage.setItem(DARK_THEME_STORAGE_KEY, String(!value));
    }
  }
});
</script>
