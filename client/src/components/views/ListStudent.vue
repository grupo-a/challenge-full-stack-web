<template>
  <div>
    <DialogDelete :show="modalDelete" :student="student" @close="modalDelete = $event" @reload="getStudents" />

    <v-data-table
      :headers="headers"
      :items="students"
      :search="searchTable"
      :loading="loading"
      class="elevation-3 rounded-0 bg-2"
      loading-text="Carregando alunos..."
      no-results-text="Sem resultados para a pesquisa"
      :header-props="headerProps"
      :footer-props="footerProps"
      no-data-text="Sem resultados"
    >
      <template v-slot:top>
        <v-row class="ma-0 pa-0">
          <v-col cols="12" sm="8" md="9" class="pb-0 pb-md-2">
            <v-text-field outlined dense v-model="searchTable" placeholder="Pesquisar" hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-btn color="primary" dark block to="/form" class="no-uppercase">Cadastrar Aluno</v-btn>
          </v-col>
        </v-row>
      </template>
      <template
        v-slot:footer.page-text="items"
      >{{ items.pageStart }}-{{ items.pageStop }} de {{ items.itemsLength }}</template>
      <template v-slot:item.actions="{ item }">
        <v-row>
          <v-col cols="6">
            <v-btn plain class="no-uppercase" @click="updateStudent(item)">
              <v-icon class="mr-2" size="18">mdi-pencil</v-icon>
              <span>Editar</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn plain class="no-uppercase" @click="deleteStudent(item)">
              <v-icon class="mr-2" size="18">mdi-trash-can</v-icon>
              <span>Excluir</span>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import DialogDelete from './DialogDelete'

export default {
  name: 'ListStudent',

  components: {
    DialogDelete
  },

  data: () => ({
    // TABLE
    headerProps: {
      sortByText: 'Filtrar por'
    },
    footerProps: {
      itemsPerPageText: 'Alunos por página:',
      itemsPerPageOptions: [7, 15, 25]
    },
    headers: [
      {
        text: 'Registro Acadêmico',
        value: 'registration'
      },
      {
        text: 'Nome',
        value: 'name'
      },
      {
        text: 'CPF',
        value: 'document'
      },
      {
        text: '',
        value: 'actions',
        sortable: false
      }
    ],
    pagination: {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10
    },
    searchTable: '',
    loading: false,
    students: [],

    // FOR DIALOGS
    student: {},
    modalDelete: false
  }),

  created () {
    this.getStudents()
  },

  methods: {
    getStudents () {
      this.loading = true
      this.axios.get('/students').then(response => {
        this.students = response.data
        this.loading = false
      })
    },
    updateStudent (student) {
      this.$router.push({
        path: '/form',
        query: {
          id: student.id
        }
      })
    },
    deleteStudent (student) {
      this.student = student
      this.modalDelete = true
    }
  }
}
</script>
