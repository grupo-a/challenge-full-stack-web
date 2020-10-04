<template>
  <div>
    <v-container style="position: relative">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h4 class="text-h4">Alunos</h4>
        </v-col>
        <v-col cols="12">
          <template>
            <v-data-table
              :headers="headers"
              :items="students"
              :items-per-page="studentsPerPage"
              :loading="loading"
              :search="search"
              class="elevation-3"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary darken-2"
                    dark
                    right
                    style="float: right"
                    @click="createStudentDialog = true"
                  >
                    <span class="d-flex d-sm-none">
                      <v-icon small>mdi-account-plus</v-icon>
                    </span>
                    <span class="d-none d-sm-flex">
                      <v-icon left>mdi-account-plus</v-icon>
                      Novo
                    </span>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn-toggle>
                  <v-btn small @click="editStudent(item)"
                    ><v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    @click="requestStudentRemove(item)"
                    color="error darken-1"
                    small
                  >
                    <v-icon small>mdi-trash-can</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </template></v-data-table
            >
          </template>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showRemoveDialog" max-width="400"
      ><v-card>
        <v-card-title class="headline">
          <div style="word-break: initial">
            <v-icon left color="yellow">mdi-alert</v-icon> Deseja realmente
            remover este aluno?
          </div>
        </v-card-title>
        <v-card-text>
          <div class="text-h6">
            {{ removeTarget.name }}
            <v-chip small color="dark"> RA: {{ removeTarget.ra }} </v-chip>
          </div>
          <div class="font-weight-bold">CPF: {{ removeTarget.cpf }}</div>
          <div class="font-weight-bold">
            Email:
            {{ removeTarget.email }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="removeStudentLoading"
            color=" darken-1"
            text
            @click="removeTargetIndex = -1"
          >
            Cancelar
          </v-btn>
          <v-btn
            :loading="removeStudentLoading"
            color="error darken-1"
            @click="confirmStudentRemove"
          >
            <v-icon small left>mdi-trash-can</v-icon>Remover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      width="200px"
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
    >
      {{ snackbarContent }}
    </v-snackbar>
    <CreateStudent
      v-bind:dialog="createStudentDialog"
      v-on:alert="alert"
      v-on:pushStudent="pushStudent"
      v-on:closeDialog="createStudentDialog = false"
    />

    <EditStudent
      v-if="editStudentDialog"
      v-bind:dialog="editStudentDialog"
      v-bind:student="currentEditStudent"
      v-on:alert="alert"
      v-on:updateStudent="updateStudent"
      v-on:closeDialog="editStudentDialog = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreateStudent from "@/components/CreateStudent.vue";
import EditStudent from "@/components/EditStudent.vue";
import studentsApi from "../api/students";
import { StudentInterface } from "../../../shared/interfaces";
import { STUDENTS_PER_PAGE } from "../constants";

export default Vue.extend({
  name: "List",
  components: { CreateStudent, EditStudent },
  async mounted() {
    try {
      this.loading = true;
      this.students = await studentsApi.get("findAll").json();
    } catch (e) {
      console.error(e);
      this.alert("error", "Erro de rede");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    alert(type: "error" | "success", message: string) {
      this.snackbar = true;
      this.snackbarContent = message;
      this.snackbarColor = `${type} darken-3`;
    },
    editStudent(selected: StudentInterface) {
      console.log(selected);
      const student = this.students.find(({ id }) => id === selected.id);

      if (!student) return;

      this.currentEditStudent = { ...student };
      this.editStudentDialog = true;
    },
    updateStudent(selected: StudentInterface) {
      this.students = this.students.map((student) => {
        return student.id === selected.id ? selected : student;
      });
    },
    requestStudentRemove(selected: StudentInterface) {
      const student = this.students.find(({ id }) => id === selected.id);
      if (!student) return;
      const index = this.students.indexOf(student);

      this.removeTargetIndex = index;
    },
    async confirmStudentRemove() {
      try {
        const { id } = this.students[this.removeTargetIndex];
        this.removeStudentLoading = true;
        await studentsApi.delete(String(id));

        this.students.splice(this.removeTargetIndex, 1);
        this.alert("success", "Aluno removido com sucesso.");
        this.removeTargetIndex = -1;
      } catch (e) {
        this.alert("error", "Erro de rede");
        this.snackbar = true;
      } finally {
        this.removeStudentLoading = false;
      }
    },
    pushStudent(student: StudentInterface) {
      this.students.push(student);
    },
  },
  computed: {
    showRemoveDialog() {
      return this.removeTargetIndex !== -1;
    },
    removeTarget() {
      return this.students[this.removeTargetIndex] || {};
    },
  },
  data: (): {
    studentsPerPage: number;
    search: string;
    headers: { text: string; value: string; sortable?: boolean }[];
    snackbar: boolean;
    snackbarColor: string;
    snackbarContent: string;
    snackbarTimeout: number;
    loading: boolean;
    removeStudentLoading: boolean;
    removeTargetIndex: number;
    createStudentDialog: boolean;
    currentEditStudent: {} | StudentInterface;
    editStudentDialog: boolean;
    students: {
      id: number;
      ra: string;
      name: string;
      cpf: string;
      email: string;
    }[];
  } => ({
    studentsPerPage: STUDENTS_PER_PAGE,
    search: "",
    headers: [
      { text: "R.A", value: "ra" },
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Email", value: "email" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    snackbar: false,
    snackbarColor: "",
    snackbarContent: "",
    snackbarTimeout: 3000,
    loading: true,
    removeStudentLoading: false,
    removeTargetIndex: -1,
    createStudentDialog: false,
    students: [],
    currentEditStudent: {},
    editStudentDialog: false,
  }),
});
</script>
