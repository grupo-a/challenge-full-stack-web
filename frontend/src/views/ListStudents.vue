<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div>Consulta de alunos</div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="mt-3">
        <v-row>
          <v-col>
            <v-btn
              color="secondary"
              class="white--text"
              link
              to="/students/register"
              >Cadastrar Aluno</v-btn
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-title>
              Alunos
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
              ></v-text-field>
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
                      <v-btn
                        color="light"
                        class="white--text"
                        @click="closeDialog()"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn color="info" @click="deleteStudentConfirm">
                        Confirmar
                      </v-btn>
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
    </v-main>
  </div>
</template>

<script>
import api from '../data/api';

export default {
  name: 'ListStudents',
  data: () => ({
    search: '',
    loading: true,
    dialog: false,
    headers: [
      {
        text: 'Registro Acadêmico',
        value: 'RA',
      },
      { text: 'Nome', value: 'name' },
      { text: 'CPF', value: 'CPF' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    selectedStudentIndex: -1,
    selectedStudent: {
      name: '',
      email: '',
      ra: '',
      cpf: '',
    },
    students: [],
  }),

  methods: {
    async getStudents() {
      try {
        const result = await api.get('/student');
        this.students = result.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    editStudent(item) {
      this.$router.push({ name: 'editStudent', params: { id: item.id } });
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
        await api.delete(`/student/${id}`);
        await this.getStudents();
        this.closeDialog();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getStudents();
  },
};
</script>
