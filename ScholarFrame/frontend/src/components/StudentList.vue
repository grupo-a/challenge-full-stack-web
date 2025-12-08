<template>
  <v-container>
    
    <div class="mb-8 text-center">
      <img 
        src="../assets/logo-mais-a-educacao.svg" 
        alt="Logo Grupo +A" 
        height="80" 
        class="mb-4"
      />
      <h1 class="text-h4 font-weight-bold mb-3">Consulta de Alunos</h1>
      <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px;">
        Todos os alunos matriculados aparecerão nesta página. Faça sua busca!
      </p>
      </div>

    <v-card>
      <v-card-text>
        <v-row class="mb-2 align-center">
          
          <v-col cols="12" md="7">
            <v-text-field
              v-model="search"
              label="Digite sua busca"
              placeholder="Nome, RA ou CPF"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="5" class="d-flex justify-end">
             <v-btn 
               color="grey-lighten-2" 
               class="mr-3" 
               @click="fetchStudents"
               height="40"
             >
               Pesquisar
             </v-btn>

             <v-btn 
               color="grey-darken-2" 
               to="/students/new"
               height="40"
             >
               Cadastrar Aluno
             </v-btn>
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="students"
          :search="search"
          item-value="ra"
          class="elevation-0 border mt-4"
        >
          <template v-slot:item.cpf="{ item }">
            {{ formatCpf(item.cpf) }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn 
              icon 
              variant="text" 
              color="blue" 
              :to="`/students/edit/${item.ra}`" 
              class="mr-2"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn 
              icon 
              variant="text" 
              color="red" 
              @click="openDeleteModal(item.ra)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="deleteDialog.show" max-width="450">
      <v-card class="pa-4 rounded-lg">
        <div class="d-flex align-start">
          
          <v-avatar color="red-lighten-5" size="50" class="mr-4">
             <v-icon color="red-darken-1" size="28">mdi-trash-can-outline</v-icon>
          </v-avatar>
          
          <div class="flex-grow-1">
            <h3 class="text-h6 font-weight-bold mb-1">Excluir aluno</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Tem certeza que deseja excluir este aluno? Essa ação não pode ser desfeita.
            </p>
            
            <div class="d-flex">
              <v-btn 
                variant="tonal" 
                color="grey-darken-1" 
                class="flex-grow-1 mr-2" 
                @click="deleteDialog.show = false"
              >
                Cancelar
              </v-btn>
              <v-btn 
                color="red-darken-1" 
                variant="flat" 
                class="flex-grow-1" 
                @click="confirmDelete"
              >
                Excluir
              </v-btn>
            </div>
          </div>

        </div>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

//State
const search = ref('');
const students = ref([]);

//State for Delete Modal
const deleteDialog = ref({
  show: false,
  raToDelete: null as number | null
});

//Table Headers
const headers = [
  { title: 'Registro Acadêmico', key: 'ra', align: 'start' },
  { title: 'Nome', key: 'name' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Ações', key: 'actions', sortable: false },
];

//Helper: Format CPF
const formatCpf = (cpf: string) => {
  if (!cpf) return '';
  if (cpf.includes('.')) return cpf;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

//Fetch Data
const fetchStudents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/students');
    students.value = response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

//Open Modal
const openDeleteModal = (ra: number) => {
  deleteDialog.value.raToDelete = ra;
  deleteDialog.value.show = true;
};

//Confirm Delete
const confirmDelete = async () => {
  if (!deleteDialog.value.raToDelete) return;

  try {
    await axios.delete(`http://localhost:3000/students/${deleteDialog.value.raToDelete}`);
    
    deleteDialog.value.show = false;
    deleteDialog.value.raToDelete = null;
    
    fetchStudents(); 
  } catch (error) {
    console.error("Error deleting:", error);
    alert("Erro ao excluir aluno.");
    deleteDialog.value.show = false;
  }
};

onMounted(() => {
  fetchStudents();
});
</script>