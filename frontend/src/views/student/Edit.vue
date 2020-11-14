<template>
  <v-card>
    <v-container class="pa-5">
      <v-alert
        :value="success"
        color="green"
        border="top"
        dismissible
        icon="mdi-check"
        transition="scale-transition"
      >
        Aluno editado com sucesso!
      </v-alert>
      <v-alert
        :value="notFound"
        color="red"
        border="top"
        dismissible
        icon="mdi-exclamation"
        transition="scale-transition"
      >
        Não foi encontrado um aluno com este id!
      </v-alert>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>Nome</v-subheader>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field
              type="text"
              v-model="name"
              :error-messages="getErrors('name')"
              label="Informe o nome completo"
              :counter="100"
              :rules="rules.nameRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>E-mail</v-subheader>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field
              type="email"
              label="Informe apenas um e-mail"
              :error-messages="getErrors('email')"
              v-model="email"
              :counter="75"
              :rules="rules.emailRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>RA</v-subheader>
          </v-col>
          <v-col cols="10" md="10">
            <v-text-field type="text" disabled v-model="ra" :counter="20" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>CPF</v-subheader>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field
              type="text"
              disabled
              v-model="cpf"
              v-mask="'###.###.###-##'"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="mr-4" @click="$router.back()">
          Cancelar
        </v-btn>
        <v-btn class="mr-4" color="secondary" type="submit">
          Salvar
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import rules from '../../validators/studentValidator';
import StudentService, { Student } from '../../services/studentService';
import { ApiValidationErrors } from '../../services/api';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default Vue.extend({
  name: 'StudentsEdit',
  data() {
    return {
      valid: true,
      name: '',
      email: '',
      cpf: '',
      ra: '',
      rules,
      serverSideValidationErrors: [] as ApiValidationErrors[],
      success: false,
      notFound: false,
    };
  },
  async created() {
    const { id } = this.$route.params;
    const response = await StudentService.getById(id);

    if (response.status === 404) {
      this.notFound = true;
    } else if (response.status === 200) {
      const { name, email, cpf, ra } = response.data;

      this.name = name;
      this.email = email;
      this.cpf = cpf || '';
      this.ra = ra || '';
    }
  },
  methods: {
    async submit() {
      this.serverSideValidationErrors = [];
      this.success = false;
      await (this.$refs.form as any).validate();

      if (this.valid && !this.notFound) {
        const student: Student = {
          name: this.name,
          email: this.email,
        };
        const { id } = this.$route.params;

        const response = await StudentService.update(id, student);

        if (response.status === 200) {
          this.success = true;
        }

        if (response.status === 422) {
          this.serverSideValidationErrors = response.data.errors as ApiValidationErrors[];
        }
      }
    },
    getErrors(field: string) {
      const fieldErrors = this.serverSideValidationErrors.find(
        (validationError: any) => validationError.input === field,
      );
      if (!fieldErrors) return [];

      return fieldErrors.errors;
    },
  },
});
</script>
