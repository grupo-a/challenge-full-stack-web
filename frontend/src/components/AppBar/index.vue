<template>
  <v-app-bar
    app
    dense
    clipped-left
    class="primary white--text"
    :elevation="1"
  >
    <v-app-bar-nav-icon
      v-if="$route.name === 'Students'"
      color="white"
      @click.stop="$actionSwitchNavigationDrawer()"
    />

    <v-toolbar-title>{{ $appName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="$route.name !== 'Students'"
      rounded
      outlined
      :to="{ name: 'Students' }"
      color="white"
      class="login-btn"
    >
      Acessar
    </v-btn>
  </v-app-bar>
</template>

<script src="./scripts.js"></script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>