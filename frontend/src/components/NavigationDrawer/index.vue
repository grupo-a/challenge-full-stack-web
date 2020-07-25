<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <div class="sub-group" v-if="$vuetify.breakpoint.smAndDown">
      <v-layout pl-4 pr-4>
        <v-avatar
          size="32px"
          item
          class="mr-2"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          /></v-avatar>

        <v-toolbar-title>{{ $appName }}</v-toolbar-title>
      </v-layout>
    </div>

    <v-divider v-if="$vuetify.breakpoint.smAndDown"></v-divider>

    <v-list dense>
      <div class="sub-group">
        <template v-for="item in items">
          <v-list-item
            :key="item.text"
            link
            :to="{name: item.route}"
            active-class="primary"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </div>

      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script src="./scripts.js"></script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>