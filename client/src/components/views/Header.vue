<template>
<v-app-bar color="white" app flat clipped-left clipped-right>
  <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>
  <div>
    <v-img src="https://www.grupoa.com.br/hs-fs/hubfs/logo-grupoa.png?width=300&name=logo-grupoa.png" width="100px"></v-img>
  </div>
</v-app-bar>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
export default {
  name: 'Header',

  data () {
    return {
      showNav: true
    }
  },

  computed: {
    ...mapState(['drawer'])
  },

  methods: {
    ...mapMutations({
      setDrawer: 'setDrawer'
    })
  }
}
</script>
