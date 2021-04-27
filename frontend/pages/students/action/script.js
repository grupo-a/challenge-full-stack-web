import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      ok: false,
      title: 'Nova pessoa',
      companies: [],
      branches: [],
      userPreferences: [],
      item: {
        status: null,
        name: '',
        email: '',
        cpf: '',
        birth: '',
        phone: '',
        address: {
          postalCode: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        },
        preferences: [],
        password: '',
        confirmationPassword: '',
        role: null,
        company: null,
        branches: [],
      },
      actionButtonItems: [
        {
          name: 'Save',
          icon: 'mdi-content-save-outline',
          clickEvent: this.save,
        },
      ],
      rules: {
        required: (value) => !!value || 'Campo obrigatório',
        minimumSelected: (value) => value.length > 0 || 'Campo obrigatório',
        email: (value) => /.+@.+/.test(value) || 'E-mail inválido',
        samePassword: (value) =>
          this.item.password === this.item.confirmationPassword ||
          'A confirmação de senha não está igual.',
      },
    }
  },
}
