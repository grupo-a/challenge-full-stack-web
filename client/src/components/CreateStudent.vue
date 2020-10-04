<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar Aluno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                style="width:100%"
              >
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nome completo"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Registro Acadêmico"
                    v-model="ra"
                    :rules="raRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="cpf"
                    :rules="cpfRules"
                    label="CPF"
                    required
                  ></v-text-field>
                </v-col>
              </v-form>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" text @click="cancel()">
            Cancelar
          </v-btn>
          <v-btn :loading="loading" color="primary darken-2" @click="create()">
            <v-icon left>mdi-account-plus</v-icon>Cadastrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { CreateStudentDtoInterface } from "../../../shared/interfaces";
import { HTTP_EXCEPTIONS_MESSAGES } from "../../../shared/constants";
import studentsApi from "../api/students";

export default Vue.extend({
  name: "CreateStudent",
  props: ["dialog"],
  methods: {
    alert(type: "error" | "success", message: string) {
      this.snackbar = true;
      this.snackbarContent = message;
      this.snackbarColor = `${type} darken-3`;
    },
    cancel() {
      (this.$refs.form as any).reset();
      (this.$refs.form as any).resetValidation();
      this.$emit("closeDialog");
    },
    async create() {
      try {
        this.valid = (this.$refs.form as any).validate();
        if (!this.valid) return;

        this.loading = true;

        const createStudentDto: CreateStudentDtoInterface = {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf
        };
        const response: any = await studentsApi
          .post("", {
            json: createStudentDto
          })
          .json();

        if (response.error) {
          switch (response.message) {
            case HTTP_EXCEPTIONS_MESSAGES.UNIQUE_VIOLATION:
              this.$emit("alert", "error", "Dados já cadastrados");
              break;
            case HTTP_EXCEPTIONS_MESSAGES.NOT_NULL_VIOLATION:
              this.$emit("alert", "error", "Dados requeridos em branco");
              break;
            default:
              this.$emit("alert", "error", "Erro interno");
          }
          return;
        }

        this.$emit("alert", "success", "Aluno cadastrado com sucesso.");
        (this.$refs.form as any).reset();
        (this.$refs.form as any).resetValidation();
        this.$emit("pushStudent", response);
        this.$emit("closeDialog");
      } catch (e) {
        this.$emit("alert", "error", "Erro de rede");
      } finally {
        this.loading = false;
      }
    }
  },
  data: () => ({
    valid: true,
    loading: false,
    snackbar: false,
    snackbarColor: "",
    snackbarContent: "",
    snackbarTimeout: 2000,
    name: "",
    nameRules: [
      (v: string) => !!v || "Nome é requerido",
      (v: string) =>
        (v && v.length >= 10) || "O nome precisa ter no mínimo 10 caracteres"
    ],
    email: "",
    emailRules: [
      (v: string) => !!v || "Email é requerido",
      (v: string) => /.+@.+\..+/.test(v) || "Email inválido"
    ],
    ra: "",
    raRules: [(v: string) => !!v || "R.A é requerido"],
    cpf: "",
    cpfRules: [
      (v: string) => !!v || "CPF é requerido",
      (v: string) => isValidCPF(v) || "CPF inválido"
    ]
  })
});
</script>
