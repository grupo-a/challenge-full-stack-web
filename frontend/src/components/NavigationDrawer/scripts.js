import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavigationDrawer',

  data: () => ({
    drawer: true,
    items: [
      { icon: 'mdi-account-group-outline', text: 'Alunos', route: 'Students' }
    ]
  }),

  computed: {
    ...mapGetters([
      '$getterIsNavigationDrawerOpen'
    ])
  },

  watch: {
    $getterIsNavigationDrawerOpen (value) {
      this.drawer = value
    },
    drawer (value) {
      this.$actionChangeNavigationDrawer(value)
    }
  },

  methods: {
    ...mapActions(['$actionChangeNavigationDrawer'])
  }
}