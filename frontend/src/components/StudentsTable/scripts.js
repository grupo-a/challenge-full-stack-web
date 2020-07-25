import { mapGetters, mapActions } from 'vuex'
import StudentModal from '@/components/StudentModal'

export default {
  name: 'StudentsTable',

  components: { StudentModal },

  data: () => ({
    dialog: false,
    search: '',
    loading: false,
    headers: [
      { text: 'Registro Acadêmico', value: 'enrollment_id', align: 'left' },
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'eamil' },
      { text: 'CPF', value: 'cpf' }
    ],
    editedIndex: -1,
    editedItem: {
      enrollment_id: '',
      name: '',
      email: '',
      cpf: ''
    },
    defaultItem: {
      enrollment_id: '',
      name: "",
      email: '',
      cpf: ''
    }
  }),

  mounted () {
    this.getItems()
  },

  computed: {
    ...mapGetters(['$getterStudents']),

    modalTitle () {
      return this.editedIndex === -1 ? 'Novo' : 'Editar'
    }
  },

  methods: {
    ...mapActions([
      '$actionGetStudents',
      '$deleteStudent'
    ]),

    getItems () {
      if (!this.loading) {
        this.loading = true

        this.$actionGetStudents()
          .finally(() => this.loading = false)
      }
    },

    editItem (item) {
      this.editedIndex = this.$getterStudents.findIndex(student => student.enrollment_id === item.enrollment_id)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.loading = true

      const confirmation = confirm('Tem certeza de que deseja remover esse registro?')

      if (confirmation) {
        this.$deleteStudent(item.enrollment_id)
          .finally(() => this.loading = false)
      } else {
        this.loading = false
      }
    },

    close () {
      this.dialog = false

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    generateEnrollmentId () {
      this.editedItem.enrollment_id = this.$uuidv4()
    }
  }
}