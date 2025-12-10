<template>
  <v-container>
    
    <div v-if="!isEditing" class="mb-8 text-center">
      <img 
        src="../assets/logo-mais-a-educacao.svg" 
        alt="Logo Grupo +A" 
        height="80" 
        class="mb-4"
      />
      <h1 class="text-h4 font-weight-bold mb-3">Formulário de matrícula</h1>
      <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px;">
        Preencha os dados abaixo para realizar a matrícula do aluno no sistema. 
      </p>
    </div>

    <div v-else class="d-flex align-center mb-5">
      <h2>Editar Aluno</h2>
    </div>

    <v-card>
      <v-card-text>
        <v-form @submit.prevent="validateAndSave" ref="formRef">
          <v-row class="mt-2">
            <v-col cols="12">
              <v-text-field 
                v-model="student.name" 
                label="Nome Completo" 
                placeholder="Ex: João da Silva"
                :rules="[rules.required, rules.fullName]"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field 
                v-model="student.email" 
                label="E-mail do Responsável" 
                type="email"
                :rules="[rules.required, rules.email]"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field 
                v-model="student.ra" 
                label="Registro Acadêmico (RA)" 
                type="number"
                :rules="[rules.required]"
                :disabled="isEditing" 
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field 
                v-model="student.cpf" 
                label="CPF do Aluno" 
                placeholder="000.000.000-00"
                :rules="[rules.required, rules.cpfLength]" 
                :disabled="isEditing"
                variant="outlined"
                maxlength="14"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-end">
            <v-btn variant="tonal" color="grey-darken-1" class="mr-4" to="/students" height="44">
              Cancelar
            </v-btn>
            <v-btn type="submit" color="grey-darken-3" class="px-6" height="44" elevation="2">
              {{ isEditing ? 'Atualizar Matrícula' : 'Realizar Matrícula' }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="successDialog.show" max-width="450" persistent>
      <v-card class="pa-4 rounded-lg">
        <div class="d-flex align-start">
          <v-avatar color="green-lighten-5" size="50" class="mr-4">
            <v-icon color="green-darken-1" size="28">mdi-check</v-icon>
          </v-avatar>

          <div class="flex-grow-1">
            <h3 class="text-h6 font-weight-bold mb-1">Sucesso!</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              {{ successDialog.message }}
            </p>
            
            <v-btn color="green-darken-1" variant="flat" block @click="closeSuccessAndRedirect">
              Ir para a lista
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog.show" max-width="450">
      <v-card class="pa-4 rounded-lg">
        <div class="d-flex align-start">
          <v-avatar color="red-lighten-5" size="50" class="mr-4">
            <v-icon color="red-darken-1" size="28">mdi-alert-circle-outline</v-icon>
          </v-avatar>
          
          <div class="flex-grow-1">
            <h3 class="text-h6 font-weight-bold mb-1">Atenção</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              {{ errorDialog.message }}
            </p>
            
            <v-btn color="grey-lighten-3" variant="flat" block @click="errorDialog.show = false">
              Entendi, vou corrigir
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const formRef = ref(null); 

//State for Student
const student = ref({ name: '', email: '', ra: '', cpf: '' });

//State for Dialogs
const errorDialog = ref({ show: false, message: '' });
const successDialog = ref({ show: false, message: '' });

const isEditing = computed(() => !!route.params.ra);

//Validation Rules
const rules = {
  required: (v: string) => !!v || 'Campo obrigatório.',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Formato de e-mail inválido.',
  cpfLength: (v: string) => v.length === 14 || 'CPF inválido (completo: 000.000.000-00).',
  fullName: (v: string) => v.trim().split(' ').length >= 2 || 'Por favor, informe o nome completo (Nome e Sobrenome).'
};

//Cpf Masking
watch(() => student.value.cpf, (newValue) => {
  if (!newValue) return;
  let v = newValue.replace(/\D/g, "");
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  student.value.cpf = v;
});

//Dialog Helpers
const showError = (message: string) => {
  errorDialog.value.message = message;
  errorDialog.value.show = true;
};

const showSuccess = (message: string) => {
  successDialog.value.message = message;
  successDialog.value.show = true;
};

const closeSuccessAndRedirect = () => {
  successDialog.value.show = false;
  router.push('/students');
};

//Save Logic
const validateAndSave = async () => {
  const { valid } = await formRef.value.validate();
  
  if (!valid) {
    if (!student.value.name || student.value.name.split(' ').length < 2) {
      showError("O nome está incompleto. Digite nome e sobrenome.");
      return;
    }
    if (student.value.cpf.length !== 14) {
      showError("O CPF informado é inválido. Verifique os números.");
      return;
    }
    if (!/.+@.+\..+/.test(student.value.email)) {
      showError("O e-mail informado é inválido.");
      return;
    }
    showError("Por favor, preencha todos os campos obrigatórios corretamente.");
    return;
  }

  try {
    if (isEditing.value) {
      await axios.put(`http://localhost:3000/students/${student.value.ra}`, {
        name: student.value.name,
        email: student.value.email
      });
      showSuccess("Cadastro atualizado com sucesso!");
    } else {
      await axios.post('http://localhost:3000/students', student.value);
      showSuccess("Matrícula realizada com sucesso!");
    }
  } catch (error: any) {
    console.error("Error saving:", error);

    if (error.response && (error.response.status === 409 || error.response.status === 400)) {
      const serverMessage = error.response.data.message;
      const errorCode = error.response.data.error;

      if (errorCode === 'RA_EXISTS') {
        showError("O RA informado já está cadastrado no sistema.");
      } else if (errorCode === 'CPF_EXISTS') {
        showError("Este CPF já pertence a outro aluno. Verifique os dados.");
      } else if (errorCode === 'EMAIL_EXISTS') {
        showError("Este e-mail já está sendo usado por outro aluno.");
      } else {
        showError(serverMessage || "Erro ao salvar os dados.");
      }
    } else {
       showError("Erro de conexão com o servidor.");
    }
  }
};

const fetchStudentData = async () => {
  if (isEditing.value) {
    try {
        const response = await axios.get('http://localhost:3000/students');
        const found = response.data.find((s: any) => String(s.ra) === String(route.params.ra));
        if (found) student.value = found;
    } catch (error) {
        console.error("Error loading student", error);
    }
  }
};

onMounted(() => {
  fetchStudentData();
});
</script>

<style scoped>
:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
:deep(input[type=number]) {
  -moz-appearance: textfield;
}
</style>