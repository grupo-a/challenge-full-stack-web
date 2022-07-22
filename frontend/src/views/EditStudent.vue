<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div>Editar de aluno</div>
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
                  type="number"
                  disabled
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
                  type="number"
                  disabled
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

export default {
  name: 'ManageStudent',
  data: () => ({
    name: '',
    nameRules: [(v) => !!v || 'Nome é obrigatório'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail é obrigatório',
      (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
    ],
    ra: '',
    cpf: '',
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
      const id = this.$route.params.id;
      try {
        const response = await api.put(`/student/${id}`, formData);
        this.callSnackBar(response.data.message);
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
    async getStudent() {
      const id = this.$route.params.id;
      try {
        const result = await api.get(`/student/${id}`);
        this.name = result.data.name;
        this.email = result.data.email;
        this.ra = result.data.RA;
        this.cpf = result.data.CPF;
      } catch (error) {
        this.callSnackBar(error.response.data.message, 'error');
      }
    },
  },
  created() {
    this.getStudent();
  },
};
</script>
