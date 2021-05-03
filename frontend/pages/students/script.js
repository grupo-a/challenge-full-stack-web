import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null,
    dialog: false,
    idToDelete: null,
    dialogDelete: false,
    headers: [
      {
        text: 'Registro Acadêmico',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Nome', value: 'name' },
      { text: 'CPF', value: 'tax' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    students: [],
  }),

  async mounted () {
    await this.getStudents()
  },

  methods: {
    ...mapActions ({
      actionFetchStudents: 'students/actionFetchStudents',
      actionDeleteStudent: 'students/actionDeleteStudent'
    }),

    async getStudents () {
      const data = await this.actionFetchStudents()
      this.students = data
    },

    async updateStudent (item) {
      const id = item.id
      this.$router.push(`/students/action/${id}`)
    },

    async deleteStudent (id) {
      const { data } = await this.actionDeleteStudent(id)
      console.log(data)
    },

    deleteItem (item) {
      this.idToDelete = item.id
      this.dialogDelete = true
    },

    async deleteConfirm () {
      const id = this.idToDelete
      await this.deleteStudent(id)
      this.closeDelete()
      alert('Item deletado com sucesso!')
      window.location.reload()
    },

    closeDelete () {
      this.dialogDelete = false
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.names.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
  },
}