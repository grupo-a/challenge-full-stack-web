<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div>Cadastro de aluno</div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container class="mt-3">
        <v-col class="col-6 mx-auto">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="name"
                  label="Nome"
                  :rules="nameRules"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  :rules="emailRules"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="ra"
                  label="RA"
                  :rules="raRules"
                  type="number"
                  hide-spin-buttons
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="cpf"
                  label="CPF"
                  :rules="cpfRules"
                  type="number"
                  hide-spin-buttons
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-col class="col-auto">
                <v-btn color="light" class="white--text" link to="/students"
                  >Cancelar</v-btn
                >
              </v-col>
              <v-col class="col-auto">
                <v-btn color="info" class="white--text" @click="submitForm"
                  >Salvar</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-container>
      <v-snackbar
        v-model="showSnackbar"
        :timeout="snackbarTimeout"
        :color="snackbarColor"
        >{{ snackbarText }}</v-snackbar
      >
    </v-main>
  </div>
</template>

<script>
import api from '../data/api';
import validateCPF from '../utils/validateCPF';

export default {
  name: 'RegisterStudent',
  data: () => ({
    name: '',
    nameRules: [(v) => !!v || 'Nome é obrigatório'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail é obrigatório',
      (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
    ],
    ra: '',
    raRules: [(v) => !!v || 'RA é obrigatório'],
    cpf: '',
    cpfRules: [
      (v) => !!v || 'CPF é obrigatório',
      (v) => validateCPF(v) || 'CPF inválido',
    ],
    valid: false,
    showSnackbar: false,
    snackbarTimeout: 5000,
    snackbarText: '',
    snackbarColor: '',
  }),
  methods: {
    validateForm() {
      this.$refs.form.validate();
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.ra = '';
      this.cpf = '';
      this.$refs.form.resetValidation();
    },
    getFormData() {
      const formData = {
        name: this.name,
        email: this.email,
        RA: this.ra,
        CPF: this.cpf,
      };
      return formData;
    },
    submitForm() {
      this.validateForm();
      if (this.valid) {
        const formData = this.getFormData();
        this.saveStudent(formData);
      }
    },
    async saveStudent(formData) {
      try {
        const response = await api.post('/student', formData);
        this.callSnackBar(response.data.message);
        this.resetForm();
      } catch (error) {
        this.callSnackBar(error.response.data.message, 'error');
      }
    },
    callSnackBar(text, status = 'success') {
      status === 'error'
        ? (this.snackbarColor = 'red accent-2')
        : (this.snackbarColor = 'green');

      this.snackbarText = text;
      this.showSnackbar = true;
    },
  },
};
</script>
