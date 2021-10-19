<template>
  <v-card class="bg-2 elevation-0 rounded-0">
    <v-toolbar dense dark flat color="primary">
      <v-toolbar-title class="font-weight-medium">{{ formTitle }}</v-toolbar-title>
    </v-toolbar>

    <v-card-text class="px-5 py-3 border-bottom">
      <v-form v-model="validForm" ref="form">
        <v-row>
          <v-col cols="12" class="pb-0 pt-5">
            <v-text-field
              outlined
              dense
              :disabled="isEdit"
              :counter="9"
              :rules="[requiredRule, numberRule, registrationRule]"
              v-model="student.registration"
              label="Registro Acadêmico*"
              placeholder="Informe o registro acadêmico"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pb-0 pt-1">
            <v-text-field
              outlined
              :rules="[requiredRule]"
              dense
              v-model="student.name"
              label="Nome*"
              placeholder="Informe o nome completo"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pb-0 pt-1">
            <v-text-field
              outlined
              dense
              :rules="[requiredRule, emailRule]"
              v-model="student.email"
              label="E-mail*"
              placeholder="Informe apenas um e-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pb-0 pt-1">
            <v-text-field
              outlined
              dense
              :counter="11"
              :disabled="isEdit"
              :rules="[requiredRule, numberRule, documentRule]"
              v-model="student.document"
              label="CPF*"
              placeholder="Informe o número do documentos"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="no-uppercase" color="red darken-1" text @click="cancel">Cancelar</v-btn>
      <v-btn
        v-if="isEdit"
        class="no-uppercase"
        :disabled="!validForm"
        color="blue darken-1"
        text
        @click="updateStudent"
      >Salvar</v-btn>
      <v-btn
        v-else
        class="no-uppercase"
        :disabled="!validForm"
        color="blue darken-1"
        text
        @click="storeStudent"
      >Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'FormStudent',

  data () {
    return {
      loading: false,
      student: {
        registration: '',
        name: '',
        document: '',
        email: ''
      },
      isEdit: false,
      validForm: true,
      snackbar: {},
      requiredRule: v => !!v || 'Campo obrigatório.',
      documentRule: v =>
        (v && v.length === 11) || 'O documento deve conter 11 caracteres.',
      registrationRule: v =>
        (v && v.length === 9) || 'O registro deve conter 9 caracteres.',
      emailRule: v => /.+@.+\..+/.test(v) || 'E-mail informado é inválido.',
      numberRule: v => /^\d+$/.test(v) || 'O campo deve conter somente números.'
    }
  },

  created () {
    if (this.$route.query.id) {
      this.isEdit = true
      this.getStudent(this.$route.query.id)
    }
  },

  computed: {
    formTitle () {
      return this.isEdit ? 'Editar aluno' : 'Novo Aluno'
    }
  },

  methods: {
    storeStudent () {
      this.loading = true
      this.axios
        .post('/students', this.student)
        .then(response => {
          this.loading = false
          this.showNotification({
            show: true,
            text: response.data.msg,
            color: 'success'
          })
          this.$router.push('/list')
        })
        .catch(err => {
          this.loading = false
          if (err.response.data) {
            this.showNotification({
              show: true,
              text: err.response.data.errors[0].msg,
              color: 'error'
            })
          }
        })
    },

    updateStudent () {
      this.loading = true
      this.axios
        .put(`/students/${this.student.id}`, this.student,
          {headers: {
            'Content-Type': 'application/json'
          }})
        .then(response => {
          this.loading = false
          this.showNotification({
            show: true,
            text: response.data.msg,
            color: 'success'
          })
          this.$router.push('/list')
        })
        .catch(err => {
          this.loading = false
          if (err.response.data) {
            this.showNotification({
              show: true,
              text: err.response.data.errors[0].msg,
              color: 'error'
            })
          }
        })
    },

    getStudent (id) {
      this.loading = true
      this.axios
        .get(`/students/${id}`)
        .then(response => {
          this.loading = false
          this.student = response.data[0]
        })
        .catch(err => {
          this.loading = false
          this.showNotification({
            show: true,
            text: err.response.data.msg,
            color: 'error'
          })
        })
    },

    cancel () {
      this.$router.push('/list')
      this.$refs.form.resetValidation()
      this.student = {
        registration: '',
        name: '',
        document: '',
        email: ''
      }
    }
  }
}
</script>
