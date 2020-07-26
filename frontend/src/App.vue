<template>
  <v-app>
    <transition name="slide-x-transition" mode="out-in">
      <navigation-drawer
        key="nav-drawer"
        v-if="$route.name === 'Students'"
      ></navigation-drawer>
    </transition>

    <transition name="slide-y-transition" mode="out-in">
      <app-bar
        key="nav-drawer"
      ></app-bar>
    </transition>

    <v-content
      class="background-grey"
    >
      <div class="scroll-container">
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
import NavigationDrawer from '@/components/NavigationDrawer'

export default {
  name: 'App',

  components: {
    AppBar,
    NavigationDrawer
  }
}
</script>

<style lang="scss">
  html { overflow: hidden !important; }
</style>
