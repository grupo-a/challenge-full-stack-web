<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="AppBarMenuClick"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="changeTheme" v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      </template>
      <span>Trocar tema</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import vue from 'vue';
import { mapState } from 'vuex';

export default vue.extend({
  name: 'AppBar',
  props: {
    drawer: Boolean,
  },
  computed: {
    ...mapState(['pageTitle']),
  },
  methods: {
    AppBarMenuClick() {
      this.$emit('drawer-menu', !this.drawer);
    },
    changeTheme() {
      localStorage.setItem('darkTheme', !this.$vuetify.theme.dark);
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
});
</script>
