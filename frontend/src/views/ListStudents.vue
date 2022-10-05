<script>
import api from "../data/api";
import ButtonBase from "@/components/Button";
import BaseView from "@/components/Base";
import {configHeaders} from "@/data/config-headers";
import {getValue} from "@/data/local-storage";

export default {
  name: "ListStudents",
  components: { BaseView, ButtonBase },
  data: () => ({
    buttons: ["Cancelar", "Confirmar"],
    search: "",
    loading: true,
    dialog: false,
    headers: [
      { text: "Registro Acadêmico", value: "ra" },
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    selectedStudentIndex: -1,
    selectedStudent: {
      name: "",
      email: "",
      ra: "",
      cpf: "",
    },
    students: [],
    showSnackbar: false,
    snackbarTimeout: 5000,
    snackbarText: "",
    snackbarColor: "",
  }),
  methods: {
    async getStudents() {
      try {
        const result = await api.get(
          "/students",
          configHeaders(getValue("token"))
        );
        this.students = result.data;
        this.loading = false;
      } catch (error) {
        this.callSnackBar(error.response.data.code, "error");
      }
    },
    editStudent(item) {
      this.$router.push({ name: "editStudent", params: { id: item.id } });
    },
    closeDialog() {
      this.dialog = false;
    },
    deleteStudent(item) {
      this.selectedStudentIndex = this.students.indexOf(item);
      this.selectedStudent = this.students[this.selectedStudentIndex];
    },
    async deleteStudentConfirm() {
      const id = this.selectedStudent.id;
      try {
        await api.delete(`/students/${id}`, configHeaders(getValue("token")));
        await this.getStudents();
        this.closeDialog();
      } catch (error) {
        this.callSnackBar(error.response.data.code, "error");
      }
    },
    callSnackBar(text, status = "success") {
      status === "error"
          ? (this.snackbarColor = "red accent-2")
          : (this.snackbarColor = "green");
      this.snackbarText = text;
      this.showSnackbar = true;
    },
  },
  created() {
    this.getStudents();
  },
};
</script>

<template>
  <div>
    <BaseView />
    <v-main>
      <v-container class="mt-3">
        <v-row align="center">
          <v-col>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
              ></v-text-field>
              <v-spacer></v-spacer>
              <ButtonBase
                class_botton="white--text"
                color_botton="secondary"
                context_botton="Cadastrar Aluno"
                redirect_botton="/students/create"
              />
            </v-card-title>
            <v-data-table
              class="elevation-1"
              :loading="loading"
              loading-text="Carregando..."
              no-data-text="Nenhum registro encontrado"
              no-results-text="Nenhum registro correspondente encontrado"
              :headers="headers"
              :items="students"
              :search="search"
              :footer-props="{
                'items-per-page-all-text': 'Todos',
                'items-per-page-text': 'Alunos por página',
              }"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editStudent(item)">
                  mdi-pencil
                </v-icon>
                <v-dialog
                  v-model="dialog"
                  max-width="350"
                  persistent
                  :retain-focus="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="deleteStudent(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <v-card>
                    <v-card-title class="text-h6">
                      Tem certeza que deseja excluir o aluno
                      {{ selectedStudent.name }}?
                    </v-card-title>
                    <v-card-text
                      >Esta ação não poderá ser desfeita.</v-card-text
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-col
                        class="col-auto"
                        v-for="button in buttons"
                        :key="button"
                      >
                        <ButtonBase
                          :context_botton="button.toUpperCase()"
                          :color_botton="
                            button === 'Confirmar' ? 'green' : 'red'
                          "
                          class_botton="white--text"
                          :action_click="
                            button === 'Confirmar'
                              ? deleteStudentConfirm
                              : closeDialog
                          "
                        />
                      </v-col>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:[`footer.page-text`]="items">
                {{ items.pageStart }} - {{ items.pageStop }} de
                {{ items.itemsLength }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
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
