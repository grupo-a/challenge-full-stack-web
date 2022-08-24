<template>
  <v-data-table
    :headers="headers"
    :items="students"
    sort-by="ra"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Registro de Alunos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Cadastrar Aluno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.ra"
                      label="Registro Acadêmico"
                      :disabled="isEditing"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cpf"
                      label="CPF"
                      :disabled="isEditing"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Resetar
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>

  import Students from '../services/students'

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Registro Acadêmico', align: 'start', sortable: true, value: 'ra' },
        { text: 'Nome', sortable: true, value: 'name' },
        { text: 'E-mail', sortable: true, value: 'email'  },
        { text: 'CPF', sortable: true, value: 'cpf'  },
        { text: 'Ações', sortable: true, value: 'actions'  },
      ],
      students: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        ra: '',
        cpf: '',
      },
      defaultItem: {
        name: '',
        email: '',
        ra: '',
        cpf: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Cadastrar Aluno' : 'Editar Aluno'
      },

      isEditing () {
        return this.editedIndex > -1
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()

      Students.getStudents().then(response => {
        console.log(response.data)
      })
    },

    methods: {
      initialize () {
        this.students = [
          { ra: 'teste1', name: 'nome aleatorio', email:"teste@teste.com", cpf: '12312312312', actions: 'edit / delete' },
          { ra: 'teste1', name: 'nome aleatorio', email:"teste@teste.com", cpf: '12312312312', actions: 'edit / delete' },
          { ra: 'teste1', name: 'nome aleatorio', email:"teste@teste.com", cpf: '12312312312', actions: 'edit / delete' },
          { ra: 'teste1', name: 'nome aleatorio', email:"teste@teste.com", cpf: '12312312312', actions: 'edit / delete' },
          { ra: 'teste1', name: 'nome aleatorio', email:"teste@teste.com", cpf: '12312312312', actions: 'edit / delete' },
        ]
      },

      editItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.students.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.students[this.editedIndex], this.editedItem)
        } else {
          this.students.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>