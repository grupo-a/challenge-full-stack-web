<template>
  <v-tabs
    v-model="tab"
    background-color="accent-4"
  >
    <v-tabs-slider></v-tabs-slider>

    <v-tab
      v-for="tab in tabs"
      :key="tab"
      :href="`#${tab}`"
    >
      {{ tab }}
    </v-tab>

    <v-tab-item
      v-for="tab in tabs"
      :key="tab"
      :value="tab"
    >

      <students-table ref="teachers-table"></students-table>
    </v-tab-item>
  </v-tabs>
</template>

<script src="./scripts.js"></script>