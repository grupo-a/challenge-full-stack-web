import { mapActions } from 'vuex'
import { isCPF } from 'brazilian-values'
import { cloneDeep } from 'lodash'

function isValidEmail (value) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

export default {
  name: 'StudentModal',

  props: {
    modalTitle: {
      type: String,
      default: 'Novo',
      required: true
    },
    editedItem: {
      type: Object,
      default: () => {},
      required: false
    }
  },

  data: () => ({
    loading: false,
    rules: {
      cpf: value => !value || isCPF(value) || 'CPF inválido!',
      email: value => !value || isValidEmail(value) || 'E-mail inválido!'
    },
    errorMessageName: '',
    errorMessageCpf: '',
    errorMessageEmail: ''
  }),

  computed: {
    unmaskedCpf () {
      return cloneDeep(this.editedItem.cpf).replace(/\./g, '').replace('-', '')
    }
  },

  methods: {
    ...mapActions([
      '$actionEditStudent',
      '$actionSaveStudent'
    ]),

    save () {
      if (this.editedItem.nome &&
        isCPF(this.editedItem.cpf) &&
        isValidEmail(this.editedItem.email) &&
        this.editedItem.password.length >= 6) {

        this.loading = true

        this.editedItem.cpf = this.unmaskedCpf

        if (this.editedIndex > -1) {
          this.$actionEditStudent(this.editedItem)
            .then(() => {
              this.loading = false

              this.close()

              this.getItems(500)
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$actionSaveStudent(this.editedItem)
            .then(() => {
              this.loading = false

              this.close()

              this.getItems(500)
            })
            .catch(() => {
              this.loading = false
            })
        }
      }

      if (!this.editedItem.nome) {
        this.errorMessageName = 'Digite um nome!'
      }

      if (!this.editedItem.cpf) {
        this.errorMessageCpf = 'Digite um CPF!'
      }

      if (!this.editedItem.email) {
        this.errorMessageEmail = 'Digite um email!'
      }

      if (!this.editedItem.password) {
        this.errorMessagePassword = 'Digite uma senha!'
      }
    },
    close () {
      this.$emit('close')
    }
  }
}