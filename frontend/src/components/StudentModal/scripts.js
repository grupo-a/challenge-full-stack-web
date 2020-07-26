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
    newData: {},
    errorMessageName: '',
    errorMessageCpf: '',
    errorMessageEmail: ''
  }),

  computed: {
    isEdition () {
      return this.modalTitle === 'Editar'
    }
  },

  methods: {
    ...mapActions([
      '$actionEditStudent',
      '$actionSaveStudent'
    ]),

    save () {
      if (this.editedItem.name &&
        isCPF(this.editedItem.cpf) &&
        isValidEmail(this.editedItem.email)) {

        this.loading = true

        this.newData =  {
          enrollment_id: this.editedItem.enrollment_id,
          name: this.editedItem.name,
          email: this.editedItem.email,
          cpf: this.unmaskCpf(this.editedItem.cpf)
        }

        if (this.isEdition) {
          this.$actionEditStudent(this.newData)
            .then(() => {
              this.loading = false
              this.close()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$actionSaveStudent(this.newData)
            .then(() => {
              this.loading = false
              this.close()
            })
            .catch(() => {
              this.loading = false
            })
        }
      }

      if (!this.editedItem.name) {
        this.errorMessageName = 'Digite um nome!'
      }

      if (!this.editedItem.cpf) {
        this.errorMessageCpf = 'Digite um CPF!'
      }

      if (!this.editedItem.email) {
        this.errorMessageEmail = 'Digite um email!'
      }
    },
    unmaskCpf (cpf) {
      return cloneDeep(cpf).replace(/\./g, '').replace('-', '')
    },
    close () {
      this.$emit('close')
    }
  }
}