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
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
    headers: [
      {
        text: 'Registro Acadêmico',
        value: 'RA',
      },
      { text: 'Nome', value: 'name' },
      { text: 'CPF', value: 'CPF' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
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
    editItem(item) {
      this.$router.push({ name: 'editStudent', params: { id: item.id } });
    },
  },
  created() {
    this.getStudents();
  },
};
</script>
