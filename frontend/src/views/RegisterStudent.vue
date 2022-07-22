<template>
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
              <v-btn color="gray" link to="/students">Cancelar</v-btn>
            </v-col>
            <v-col class="col-auto">
              <v-btn color="green" class="white--text" @click="submitForm"
                >Salvar</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-container>
  </v-main>
</template>

<script>
import validateCPF from '../utils/validateCPF';
export default {
  data: () => ({
    name: '',
    nameRules: [
      (v) => !!v || 'Nome é obrigatório',
      (v) =>
        (v && v.length <= 10) || 'O nome precisa ter ao menos 10 caracteres',
    ],
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
  }),
  methods: {
    validateForm() {
      this.$refs.form.validate();
    },
    getFormInputs() {
      const json = JSON.stringify({
        name: this.name,
        email: this.email,
        ra: this.ra,
        cpf: this.cpf,
      });
      return json;
    },
    submitForm() {
      this.validateForm();
      if (this.valid) {
        console.log('submited');
        console.log(this.getFormInputs());
      }
    },
  },
};
</script>
