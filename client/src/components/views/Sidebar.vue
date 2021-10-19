<template>
  <v-navigation-drawer v-model="drawer" mobile-breakpoint="920" clipped app class="ma-0 bg-2">
    <h4 class="text-left px-3 my-2 font-weight-medium">Módulo acadêmico</h4>
    <v-divider></v-divider>
    <v-list dense nav class="text-left">
      <v-list-item link to="/list" active-class="primary--text">
        <v-list-item-content>
          <v-list-item-title>Alunos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',

  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('setDrawer', val)
      }
    }
  }
}
</script>
