<script>
import Button from "@/components/Button";
import api from "@/data/api";
import {setValue} from "@/data/local-storage";

export default {
  name: "LoginView",
  components: { Button },
  data: () => ({
    buttons: ["Login"],
    fields: ["enrolment", "password"],
    model: {
      enrolment: "",
      password: "",
    },
    rules: {
      enrolment: [(v) => !!v || "E-mail é obrigatório"],
      password: [(v) => !!v || "Password é obrigatório"],
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
      this.model.enrolment = "";
      this.model.password = "";
      this.$refs.form.resetValidation();
    },
    getFormData() {
      return {
        enrolment: this.model.enrolment,
        password: this.model.password,
      };
    },
    async submitForm() {
      this.validateForm();
      if (this.valid) {
        const formData = this.getFormData();
        await this.signIn(formData);
      }
    },
    async signIn(formData) {
      try {
        const response = await api.post("/signin", formData);
        this.callSnackBar(response.data.message);
        setValue("token", response.data.token);
        this.resetForm();
        await this.$router.push({ name: "students" });
      } catch (error) {
        this.callSnackBar(error.response.data.code, "error");
      }
    },
    callSnackBar(text = "Login realizado com sucesso!", status = "success") {
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
          <v-col class="col-auto center">
            <v-img src="../assets/logo.svg"></v-img>
          </v-col>
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
