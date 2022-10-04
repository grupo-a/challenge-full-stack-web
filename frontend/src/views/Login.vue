<script>
import Button from "@/components/Button";
import api from "@/data/api";

export default {
  name: "LoginView",
  components: { Button },
  data: () => ({
    buttons: ["Login"],
    fields: ["email", "password"],
    model: {
      email: "",
      password: "",
    },
    rules: {
      email: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      password: [
        (v) => !!v || "Password é obrigatório",
        (v) => v.split("").length === 11 || "CPF inválido",
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
      this.model.email = "";
      this.model.password = "";
      this.$refs.form.resetValidation();
    },
    getFormData() {
      return {
        email: this.model.email,
        password: this.model.password,
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
      try {
        const response = await api.post("/students", formData);
        this.callSnackBar(response.data.message);
        this.resetForm();
      } catch (error) {
        this.callSnackBar(error.response.data.code, "error");
      }
    },
    callSnackBar(text = "Registro realizado com sucesso!", status = "success") {
      status === "error"
        ? (this.snackbarColor = "red accent-2")
        : (this.snackbarColor = "green");
      this.snackbarText = text;
      this.showSnackbar = true;
    },
  },
};
</script>

<template>
  <div>
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
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col class="col-auto" v-for="button in buttons" :key="button">
                <Button
                  :context_botton="button.toUpperCase()"
                  color_botton="green"
                  class_botton="white--text"
                  redirect_botton="/students"
                  :action_click="submitForm"
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
