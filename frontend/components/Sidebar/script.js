export default {
    data () {
      return {
        clipped: true,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Bem-vindo!',
            to: '/'
          },
          {
            icon: 'mdi-account-group',
            title: 'Alunos',
            to: '/students'
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Grupo A Educação'
      }
    }
  }