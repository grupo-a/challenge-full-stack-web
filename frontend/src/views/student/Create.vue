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
        Aluno cadastrado com sucesso!
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
            <v-text-field
              type="text"
              label="Informe o registro acadêmico"
              :error-messages="getErrors('ra')"
              v-model="ra"
              :counter="20"
              :rules="rules.raRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>CPF</v-subheader>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field
              type="text"
              label="Informe o número do documento"
              :error-messages="getErrors('cpf')"
              v-model="cpf"
              v-mask="'###.###.###-##'"
              :rules="rules.cpfRules"
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
import StringHelpers from '../../helpers/string';
import { ApiValidationErrors } from '../../services/api';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default Vue.extend({
  name: 'StudentsCreate',
  data() {
    return {
      valid: true,
      name: '',
      email: '',
      ra: '',
      cpf: '',
      rules,
      serverSideValidationErrors: [] as ApiValidationErrors[],
      success: false,
    };
  },
  methods: {
    async submit() {
      this.serverSideValidationErrors = [];
      this.success = false;
      await (this.$refs.form as any).validate();

      if (this.valid) {
        const student: Student = {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: StringHelpers.onlyNumbers(this.cpf),
        };

        const response = await StudentService.create(student);

        if (response.status === 201) {
          (this.$refs.form as any).reset();
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
