<template>
  <v-container>
    <h1>{{ title }}</h1>

    <ValidationObserver ref="studentObserver" v-slot="{ handleSubmit, reset }">
      <v-form
        ref="studentForm"
        @submit.prevent="handleSubmit(submit)"
        @reset.prevent="reset"
      >
        <!-- <v-text-field v-model="ra" label="RA"></v-text-field> -->
        <ValidationProvider v-slot="{ errors }" name="Nome" rules="required">
          <v-text-field
            v-model="student.name"
            label="NOME"
            :error-messages="errors"
            required
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Email"
          rules="required|email"
        >
          <v-text-field
            v-model="student.email"
            label="EMAIL"
            :error-messages="errors"
            required
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="CPF" rules="required|cpf">
          <v-text-field
            v-model="student.cpf"
            label="CPF"
            :error-messages="errors"
            required
          ></v-text-field>
        </ValidationProvider>
        <div class="buttonsForm">
          <v-btn color="primary" type="submit" class="mr-4">Cadastrar</v-btn>
          <v-btn @click="clear" class="mr-4">Limpar</v-btn>
          <v-progress-circular
            :size="30"
            v-show="showProgress"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-form>
    </ValidationObserver>
    <v-alert type="success" v-show="showSuccessAlert">
      Cadastrado com sucesso!
    </v-alert>
  </v-container>
</template>

<script>
import service from '@/services/students-service';
import { required, email } from 'vee-validate/dist/rules';
import cpfValidator from '@/utils/cpf-validator.js';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} não pode ser vazio.',
});

extend('email', {
  ...email,
  message: 'Email inválido.',
});

extend('cpf', {
  message: 'CPF inválido.',
  validate: (value) => cpfValidator(value),
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mounted() {},
  data: () => ({
    title: 'Cadastro de Alunos',
    showSuccessAlert: false,
    showProgress: false,
    student: {
      name: '',
      cpf: '',
      email: '',
    },
  }),
  methods: {
    submit() {
      this.showProgress = true;
      service.saveStudent(this.student).then((student) => {
        console.log('Aluno salvo: ', student);
        this.showSuccessAlert = true;
        this.showProgress = false;
        this.clear();
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 2000);
      });
    },

    clear() {
      this.$refs.studentForm.reset();
      this.$refs.studentObserver.reset();
    },
  },
};
</script>

<style scoped>
.buttonsForm {
  margin-top: 1em;
  margin-bottom: 2em;
}
</style>
