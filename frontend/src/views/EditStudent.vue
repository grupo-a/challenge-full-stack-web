<script>
import api from "../data/api";
import ButtonBase from "@/components/Button";
import BaseView from "@/components/Base";

export default {
  name: "EditStudent",
  components: {  ButtonBase, BaseView },
  data: () => ({
    buttons: ["Cancelar", "Salvar"],
    fields: ["name", "email", "ra", "cpf"],
    model: {
      name: "",
      email: "",
      ra: "",
      cpf: "",
    },
    rules: {
      name: [(v) => !!v || "Nome é obrigatório"],
      email: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
    },
    valid: false,
    showSnackbar: false,
    snackbarTimeout: 5000,
    snackbarText: "",
    snackbarColor: "",
  }),
  methods: {
    validateForm() {
      this.$refs.form.validate();
    },
    resetForm() {
      this.model.name = "";
      this.model.email = "";
      this.model.ra = "";
      this.model.cpf = "";
      this.$refs.form.resetValidation();
    },
    getFormData() {
      return {
        name: this.model.name,
        email: this.model.email,
      };
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
        const response = await api.put(`/students/${id}`, formData);
        this.callSnackBar(response.data.message);
      } catch (error) {
        this.callSnackBar(error.response.data.message, "error");
      }
    },
    callSnackBar(
      text = "Atualização realizada com sucesso!",
      status = "success"
    ) {
      status === "error"
        ? (this.snackbarColor = "red accent-2")
        : (this.snackbarColor = "green");
      this.snackbarText = text;
      this.showSnackbar = true;
    },
    async getStudent() {
      const id = this.$route.params.id;
      try {
        const result = await api.get(`/students/${id}`);
        this.model.name = result.data.name;
        this.model.email = result.data.email;
        this.model.ra = result.data.ra;
        this.model.cpf = result.data.cpf;
      } catch (error) {
        new Promise(() =>
          this.callSnackBar(error.response.data.code, "error")
        ).then(() => {
          setTimeout(() => {
            console.log(this.$route.path);
          }, this.snackbarTimeout);
        });
      }
    },
  },
  created() {
    this.getStudent();
  },
};
</script>

<template>
  <div>
    <v-app-bar app>
      <div>Editar de aluno</div>
    </v-app-bar>
    <BaseView />
    <v-main>
      <v-container class="mt-3">
        <v-col class="col-6 mx-auto">
          <v-form ref="form" v-model="valid">
            <v-row v-for="field in fields" :key="field">
              <v-col>
                <v-text-field
                  v-model="model[field]"
                  :label="field.toUpperCase()"
                  :rules="rules[field]"
                  outlined
                  required
                  :disabled="field === 'cpf' || field === 'ra' || showSnackbar"
                  :hide-spin-buttons="field === 'cpf' || field === 'ra'"
                  :type="field === 'cpf' ? 'number' : undefined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col class="col-auto" v-for="button in buttons" :key="button">
                <ButtonBase
                  :context_botton="button.toUpperCase()"
                  :color_botton="button === 'Salvar' ? 'green' : 'red'"
                  class_botton="white--text"
                  :redirect_botton="
                    button === 'Cancelar' ? '/students' : undefined
                  "
                  :action_click="button === 'Salvar' ? submitForm : undefined"
                />
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
