<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Digite sua busca"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col class="text-right">
                <v-btn
                  color="primary"
                  class="mb-2"
                  to="/cadastro"
                >
                  Cadastrar Aluno
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="students"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="studentActions(item, 'edit')"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="studentActions(item, 'delete')"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn
                color="primary"
                @click="initialize"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="deleteModal.open"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title>Tem certeza que deseja excluir este registro?</v-card-title>
        <v-card-text><strong>Nome:</strong> {{deleteModal.name}}<br/><strong>RA:</strong> {{deleteModal.ra}}.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            type='danger'
            @click="deleteModal.open = false"
          >
            Não, cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteStudent(deleteModal.id)"
          >
            Sim, excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import axios from './../http/axios'
  export default {
    data() {
      return {
        search: '',
        headers: [
          { text: 'Registro Acadêmico', value: 'ra' },
          { text: 'Nome', value: 'name' },
          { text: 'CPF', value: 'cpf' },
          { text: 'Ações', value: 'actions', sortable: false }
        ],
        students: [],
        deleteModal: {
          open: false,
          id: null,
          name: null,
          ra: null
        }
      }
    },
    beforeMount() {
      this.loadStudents()
    },
    methods: {
      //Populate students list
      loadStudents() {
        axios.get('/students').then((response) => {
          response = response.data
          this.students = response
        })
      },
      //Define actions for a student
      studentActions(item, action) {
        if (action == 'delete') {
          this.deleteModal.open = true
          this.deleteModal.id = item.id
          this.deleteModal.name = item.name
          this.deleteModal.ra = item.ra
        }

        if (action == 'edit') {
          this.$router.push('/cadastro/'+item.id)
        }
      },
      //Perform student deletion
      deleteStudent(id) {
        axios.post('/students/delete', { id: id }).then((response) => {
          response = response.data
          if (response.success !== undefined) {
            this.deleteModal.open = false
            this.loadStudents()
          }
        })
      }
    }
  }
</script>