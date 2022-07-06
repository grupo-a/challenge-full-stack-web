<template>
  <div>
    <v-row class="px-3 mx-5">
      <v-col cols="7" class="d-flex">
        <v-text-field
          x-small
          class="align-center"
          v-model="name" 
          label="Digite sua busca" 
          outlined
        >
        </v-text-field>
      </v-col>

      <v-col cols="3">
        <v-btn 
          x-large class="ml-5" 
          @click="searchName"
          color="primary"
        >
          Pesquisar
        </v-btn>
      </v-col>
        
      <v-spacer />

      <v-col cols="2">
        <v-btn 
          x-large 
          to="/form"
          color="primary"
        >
          Cadastrar
        </v-btn>
      </v-col>
    </v-row>

    <br />

    <v-data-table
      class="elevation-5 h-full"
      :headers="headers"
      :items="students"
      mobile-breakpoint="800"
      :items-per-page="10"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="text-truncate">
          <v-btn
            small
            class="mr-2"
            plain
            @click="showEditDialog(item)"
          >
            <v-icon 
              md
              color="black"
            >
              mdi-pencil
            </v-icon>
          </v-btn>

          <v-btn
            small
            class="mr-2"
            plain
          >
            <v-icon
              md
              @click="showDeleteDialog(item)"
              color="red" 
            >
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card class="text-center">
        <v-card-title>Exclusão</v-card-title>
        
        <v-card-text>Tem certeza que deseja excluir o aluno: {{ studentToDelete.name }}?</v-card-text>
        
        <v-card-actions>
          <v-btn color="primary" text @click="dialogDelete = false">Fechar</v-btn>

          <v-spacer />

          <v-btn color="primary" text @click="deleteStudent()">Deletar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: "StudentsList",
  data () {
    return {
      name: "",
      students: [],
      editedStudent: {},
      dialog: false,
      dialogDelete: false,
      studentToDelete: {},
      headers: [
        { text: 'Registro Acadêmico', align: "center", sortable: true, value: "ra" },
        { text: 'Nome', align: "center", sortable: true, value: "name" },
        { text: 'CPF', align: "center", sortable: true, value: "cpf" },
        { text: 'Ações', align: "center", sortable: true, value: "actions" }
      ]
    }
  },
  methods: {
    loadStudents() {
      this.students = []
      
      this.$store.dispatch('GET_STUDENTS').then((response) => {
        this.students = response.data.map((student) => {
          return {
            id: student.id,
            ...student
          }
        })
      }).catch((err) => {
        console.error(err)
      })
    },

    searchName() {
      this.$store.dispatch('GET_STUDENT_NAME', this.name)
        .then(({ data }) => {
          this.students = data.map(this.getDisplay);
        }).catch((err) => {
          console.error(err);
        });
    },

    getDisplay({ id, ra, name, cpf }) {
      return {
        id: id,
        ra: ra,
        name: name,
        cpf: cpf
      };
    },

    refreshList() {
      this.loadStudents();
    },

    deleteStudent() {
      try {
        if (this.studentToDelete.id) {
          this.$store.dispatch('DELETE_STUDENT', this.studentToDelete.id);
        }

        this.dialogDelete = false;
        this.loadStudents();
      } catch (err) {
        console.error(err);
      }
    },

    showEditDialog({ id }) {
      router.push(`/form/${id}`)
    },

    showDeleteDialog(student) {
      this.studentToDelete = student
      this.dialogDelete = !this.dialogDelete
    },
  },

  mounted() {
    this.loadStudents();
  },
}
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}

.v-data-table__wrapper > table > tbody > tr:hover {
  background: inherit !important;
}
</style>