import StudentsTable from '@/components/StudentsTable'

export default {
  name: 'Students',

  components: {
    StudentsTable
  },

  data: () => ({
    tab: 'Alunos',
    tabs: ['Alunos']
  })
}