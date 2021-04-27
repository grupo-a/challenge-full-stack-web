<template>
  <div>
    <v-layout row no-gutters>
      <v-container fluid>
        <v-row class="fill-height">
          <v-card class="pa-10" width="100%">
            <v-card-title
              class="v-card--material__heading ma-0 pa-0"
              v-text="title"
            />
            <v-divider />
            <v-card-text class="pa-0 my-5">
              <slot />
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-layout>
  </div>
</template>

<script type="text/javascript" src="./script.js" />

<style scoped lang="scss" src="./style.scss" />
