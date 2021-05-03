import { mapActions } from 'vuex'

export default {
  data() {
    return {
      id: '',
      title: 'Novo Estudante',
      students: [],
      student: [],
      item: {
        name: '',
        email: '',
        cpf: '',
        id: '',
      },
      rules: {
        required: (value) => !!value || 'Campo obrigatório',
        minimumSelected: (value) => value.length > 0 || 'Campo obrigatório',
        email: (value) => /.+@.+/.test(value) || 'E-mail inválido',
      },
    }
  },
  async mounted() {
    if (this.isEdit) {
      this.id = this.$route.params.id
      this.title = 'Editar Estudante'

      await this.getStudent()
    }
  },
  computed: {
    isEdit() {
      return this.$route.params.id
      
    }
  },
  methods: {
    ...mapActions ({
      actionAddStudent: 'students/actionAddStudent',
      actionGetStudent: 'students/actionGetStudent',
      actionUpdateStudent: 'students/actionUpdateStudent',
    }),

    async addStudent () {
      const name = this.item.name
      const tax = this.item.tax
      const email = this.item.email
      
      const item = {
        name,
        tax,
        email
      }
      await this.actionAddStudent(item)
      this.$router.push('/students')
    },

    async getStudent () {
      const data = await this.actionGetStudent(this.id)
      
      this.item.name = data.name
      this.item.tax = data.tax
      this.item.id = data.id
      this.item.email = data.email 
    },

    async update () {
      const name = this.item.name
      const id = this.item.id
      const email = this.item.email
      const tax = this.item.tax
      
      const student = {
        name,
        email,
        tax
      }
      await this.actionUpdateStudent({id, student})
      this.$router.push('/students')
    },

    handleSubmit () {
      if (this.isEdit) {
        this.update()
      } else {
        this.addStudent()
      }

    }
  }
}
