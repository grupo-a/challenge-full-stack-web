<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="d-flex justify-space-between align-center bg-blue-darken-2 text-white">
            <span class="text-h5 font-weight-bold">Gerenciamento de Alunos</span>
            <v-btn color="white" variant="outlined" @click="showDialog = true">
              <v-icon start>mdi-plus</v-icon>
              Cadastrar Aluno
            </v-btn>
          </v-card-title>
          
          <v-card-text>
            <v-progress-linear
              v-if="loading"
              indeterminate
              color="blue"
            ></v-progress-linear>
            
            <v-table v-else density="comfortable">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Nome</th>
                  <th class="text-left font-weight-bold">Email</th>
                  <th class="text-left font-weight-bold">RA</th>
                  <th class="text-left font-weight-bold">CPF</th>
                  <th class="text-left font-weight-bold">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id" class="hover-row">
                  <td>{{ student.name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.ra }}</td>
                  <td>{{ student.cpf }}</td>
                  <td>
                    <v-btn 
                      icon 
                      variant="text" 
                      size="small" 
                      color="blue" 
                      @click="editStudent(student)"
                      title="Editar aluno"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn 
                      icon 
                      variant="text" 
                      size="small" 
                      color="red" 
                      @click="deleteStudent(student)"
                      title="Excluir aluno"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr v-if="students.length === 0">
                  <td colspan="5" class="text-center text-grey py-4">
                    Nenhum aluno cadastrado
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="bg-blue-darken-2 text-white">
          <span class="text-h5">{{ isEditing ? 'Editar Aluno' : 'Cadastrar Aluno' }}</span>
        </v-card-title>
        
        <v-card-text class="pa-4">
          <v-form ref="form" @submit.prevent="saveStudent">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedStudent.name"
                    label="Nome completo*"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-text-field
                    v-model="editedStudent.email"
                    label="Email*"
                    type="email"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedStudent.ra"
                    label="Registro Acadêmico (RA)*"
                    required
                    :disabled="isEditing"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedStudent.cpf"
                    label="CPF*"
                    maxLength="14"
                    placeholder="000.000.000-00"
                    required
                    :disabled="isEditing"
                    @input="onCPFInput"
                    @blur="onCPFInput($event)"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue-darken-2" variant="flat" @click="saveStudent" :loading="saving">
            {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'StudentList',
  data() {
    return {
      students: [],
      showDialog: false,
      isEditing: false,
      loading: false,
      saving: false,
      editedStudent: {
        name: '',
        email: '',
        ra: '',
        cpf: ''
      },
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      }
    }
  },
  methods: {
    formatCPF(cpf) {
      cpf = cpf.replace(/\D/g, '')
      
      if (cpf.length <= 3) {
        return cpf
      } else if (cpf.length <= 6) {
        return cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2')
      } else if (cpf.length <= 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
      } else {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
      }
    },
    
    onCPFInput(event) {
      const formattedCPF = this.formatCPF(event.target.value)
      this.editedStudent.cpf = formattedCPF
    },
    async saveStudent() {
   this.saving = true
  try {
    const authStore = useAuthStore()
    console.log('Token:', authStore.token)
    
    let url = 'http://localhost:3000/api/students'
    let method = 'POST'
    let dataToSend = { ...this.editedStudent }
    
    if (this.isEditing) {
      url = `http://localhost:3000/api/students/${this.editedStudent.id}`
      method = 'PUT'
      dataToSend = {
        name: this.editedStudent.name,
        email: this.editedStudent.email
      }
    }
    
    console.log('Enviando para:', url, 'Dados:', dataToSend)
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    
    console.log('Status:', response.status)
    const result = await response.json()
    console.log('Resposta:', result)
    
    if (result.success) {
      this.closeDialog()
      this.loadStudents()
      this.showSnackbar(`Aluno ${this.isEditing ? 'editado' : 'cadastrado'} com sucesso`, 'success')
    } else {
      this.showSnackbar(result.message, 'error')
    }
  } catch (error) {
    console.error('Erro ao salvar aluno:', error)
    this.showSnackbar('Erro ao salvar aluno: ' + error.message, 'error')
  } finally {
    this.saving = false
  }
},
    editStudent(student) {
      this.editedStudent = { ...student }
      this.isEditing = true
      this.showDialog = true
    },
    
    async deleteStudent(student) {
      if (confirm(`Deseja excluir o aluno ${student.name}?`)) {
        try {
          const authStore = useAuthStore()
          const response = await fetch(`http://localhost:3000/api/students/${student.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authStore.token}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            this.loadStudents()
            this.showSnackbar('Aluno excluído com sucesso', 'success')
          } else {
            const result = await response.json()
            this.showSnackbar(result.message || 'Erro ao excluir aluno', 'error')
          }
        } catch (error) {
          console.error('Erro ao excluir aluno:', error)
          this.showSnackbar('Erro ao excluir aluno', 'error')
        }
      }
    },
    
   
    
    closeDialog() {
      this.showDialog = false
      this.isEditing = false
      this.editedStudent = { name: '', email: '', ra: '', cpf: '' }
    },
    
    async loadStudents() {
      this.loading = true
      try {
        const authStore = useAuthStore()
        const response = await fetch('http://localhost:3000/api/students', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        })
        
        const result = await response.json()
        if (result.success) {
          this.students = result.data
        } else {
          this.showSnackbar(result.message, 'error')
        }
      } catch (error) {
        console.error('Erro ao carregar alunos:', error)
        this.showSnackbar('Erro ao carregar alunos', 'error')
      } finally {
        this.loading = false
      }
    },
    
    showSnackbar(message, color = 'success') {
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.show = true
    }
  },
  mounted() {
    this.loadStudents()
  }
}
</script>

<style scoped>
.hover-row:hover {
  background-color: #f5f5f5;
  transition: background-color 0.3s;
}
</style>