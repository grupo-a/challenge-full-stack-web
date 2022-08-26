<template>
  <v-data-table
    :headers="headers"
    :items="students"
    sort-by="ra"
    class="elevation-1"
    :search="search"
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
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nome"
                        :rules="nameRules"
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
                        :rules="emailRules"
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
                        :rules="raRules"
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
                        :rules="cpfRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
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
                :disabled="!valid"
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
      <v-text-field
          v-model="search"
          label="Digite sua busca"
          class="mx-4"
      ></v-text-field>
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
      search: '',
      dialog: false,
      dialogDelete: false,
      valid: true,
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
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => /^[a-zA-Z ]+$/.test(v) || 'Nome deve conter apenas letras',
      ],
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      raRules: [
        v => /^\d+$/.test(v) || 'RA deve conter apenas números',
        v => !!v || 'RA é obrigatório',
        v => (v && v.length === 6) || 'RA deve ter 6 caracteres',
      ],
      cpfRules: [
        v => /^\d+$/.test(v) || 'CPF deve conter apenas números',
        v => !!v || 'CPF é obrigatório',
        v => (v && v.length === 11) || 'CPF deve ter 11 caracteres',
      ],
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
    },

    methods: {

      initialize () {
        Students.getStudents().then(response => {
          this.students = response.data
        })
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
        Students.deleteStudent(this.editedItem.ra).then(() => {
          this.students.splice(this.editedIndex, 1)
          this.closeDelete()
        });
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
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            const student = this.students[this.editedIndex]
            const where = this.editedItem;
            Students.putStudent(where, where.ra).then(() => {
              Object.assign(student, where);
              this.close();
            });
          } else {
            const editedItem = this.editedItem;
            // this.checkRaExistance(editedItem.ra)
            const checkRaExistance = this.students.find(student => student.ra === this.editedItem.ra)
            if (checkRaExistance) {
              this.valid = false
              console.log('RA já cadastrado')
            } else {
              Students.postStudent(editedItem).then(() => {
                this.students.push(editedItem);
                this.close()
             });
            }
          }
        }
      },
    },
  }
</script>