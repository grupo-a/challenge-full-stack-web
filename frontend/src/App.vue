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

  .background-grey { background: #f2f2f2; }

  .v-content__wrap {
    max-height: 100vh;
    padding-bottom: 50px;
  }

  .v-btn--text {
    text-transform: unset;
    letter-spacing: 0.25px;
  }

  .v-text-field__details {
    padding: 0 !important;
  }

  .scroll-container {
    height: 100%;
    overflow-y: auto;
    backface-visibility: hidden;
  }

  .v-list {
    padding: 2px 0;
  }

  .v-list-item__mask {
    color: inherit !important;
    background: yellow !important;
  }

  .v-chip--disabled {
    opacity: 1;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(43, 129, 214, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(43, 129, 214, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(43, 129, 214, 0);
    }
  }
</style>
