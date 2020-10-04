<template>
  <v-container>
    <v-navigation-drawer
      app
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      color="grey lighten-3"
      floating
      v-model="drawer"
    >
      <v-sheet class="pa-4" style="position: relative">
        <v-img
          v-if="!$vuetify.theme.dark"
          alt="Grupo A"
          class="shrink mt-1"
          contain
          min-width="70"
          src="../assets/logo.black.png"
          width="70"
          style="margin: 0 auto"
        />
        <v-img
          v-if="$vuetify.theme.dark"
          alt="Grupo A"
          class="shrink mt-1"
          contain
          min-width="70"
          src="../assets/logo.png"
          width="70"
          style="margin: 0 auto"
        />

        <v-btn
          icon
          @click.stop="drawer = !drawer"
          large
          absolute
          style="top: 50%; right: 4px; transform: translateY(-50%)"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-sheet>

      <v-list>
        <v-list-item
          v-for="([icon, name, text], i) in items"
          :key="i"
          link
          dark
          @click.stop="navigate(name)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-if="!drawer"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Grupo A</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        fab
        :light="$vuetify.theme.dark"
        :dark="!$vuetify.theme.dark"
        x-small
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon v-if="!$vuetify.theme.dark">
          mdi-weather-night
        </v-icon>
        <v-icon v-if="$vuetify.theme.dark">
          mdi-white-balance-sunny
        </v-icon>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ROUTES } from "../constants";

export default Vue.extend({
  name: "Navigation",
  methods: {
    navigate(name: string) {
      this.$router.push({ name });
    },
  },
  data: () => {
    const windowWidth = window.innerWidth;

    return {
      drawer: windowWidth > 1200,
      items: [["mdi-card-account-details", ROUTES.STUDENTS.NAME, "Alunos"]],
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
});
</script>
