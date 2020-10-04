<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar aluno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form
                ref="editForm"
                v-model="valid"
                lazy-validation
                style="width:100%"
              >
                <v-col cols="12">
                  <v-text-field
                    v-model="student.name"
                    :rules="nameRules"
                    label="Nome completo"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="student.email"
                    :rules="emailRules"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Registro Acadêmico"
                    v-model="student.ra"
                    readonly
                    :rules="raRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="student.cpf"
                    :rules="cpfRules"
                    readonly
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
          <v-btn :loading="loading" color="primary darken-2" @click="edit()">
            <v-icon left>mdi-content-save-edit</v-icon>Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { UpdateStudentDtoInterface } from "../../../shared/interfaces";
import { HTTP_EXCEPTIONS_MESSAGES } from "../../../shared/constants";
import studentsApi from "../api/students";

export default Vue.extend({
  name: "CreateStudent",
  props: ["student", "dialog"],
  methods: {
    cancel() {
      (this.$refs.editForm as any).reset();
      (this.$refs.editForm as any).resetValidation();
      this.$emit("closeDialog");
    },
    async edit() {
      try {
        this.valid = (this.$refs.editForm as any).validate();
        if (!this.valid) return;

        this.loading = true;

        const updateStudentDto: UpdateStudentDtoInterface = {
          name: this.student.name,
          email: this.student.email,
        };

        const response: any = await studentsApi
          .patch(String(this.student.id), {
            json: updateStudentDto,
          })
          .json();

        if (response.error) {
          switch (response.message) {
            case HTTP_EXCEPTIONS_MESSAGES.UNIQUE_VIOLATION:
              this.$emit("alert", "error", "Dados em uso");
              break;
            default:
              this.$emit("alert", "error", "Erro interno");
          }
          return;
        }

        this.$emit("alert", "success", "Dados atualizados");
        this.$emit("updateStudent", { ...this.student });
        this.$emit("closeDialog");

        (this.$refs.editForm as any).reset();
        (this.$refs.editForm as any).resetValidation();
      } catch (e) {
        console.error(e);
        this.$emit("alert", "error", "Erro de rede");
      } finally {
        this.loading = false;
      }
    },
  },
  data() {
    return {
      valid: true,
      loading: false,
      name: "",
      nameRules: [
        (v: string) => !!v || "Nome é requerido",
        (v: string) =>
          (v && v.length >= 10) || "O nome precisa ter no mínimo 10 caracteres",
      ],
      email: "",
      emailRules: [
        (v: string) => !!v || "Email é requerido",
        (v: string) => /.+@.+\..+/.test(v) || "Email inválido",
      ],
      ra: "",
      raRules: [(v: string) => !!v || "R.A é requerido"],
      cpf: "",
      cpfRules: [
        (v: string) => !!v || "CPF é requerido",
        (v: string) => isValidCPF(v) || "CPF inválido",
      ],
    };
  },
});
</script>
