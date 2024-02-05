<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import Loading from '@/components/Loading.vue';
import useCpfMask from '../../helpers/maskCpf';

const user = ref({
  ra: '',
  cpf: '',
  email: '',
  name: '',
  password: '',
});

const notification = ref({
  createSuccess: false,
  message: '',
  color: ''
});

const loading = ref(false);

const raRules = [
  (v: string) => !!v || 'RA é obrigatório',
];

const cpfRules = [
  (v: string) => !!v || 'CPF é obrigatório',
];

const emailRules = [
  (v: string) => !!v || 'E-mail é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail não é válido',
];

const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
];

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
];

const submitForm = async (e: Event) => {
  e.preventDefault();
  loading.value = true;
  console.log(loading.value);
  const response = await axios.post('/users', user.value)

if (response.status === 201) {
    setInterval(() => {
      loading.value = false;
      notification.value.createSuccess = true;
      notification.value.message = 'Usuário cadastrado com sucesso';
      notification.value.color = 'success';
      user.value = {
        ra: ' ',
        cpf: ' ',
        email: '',
        name: ' ',
        password: '',
      };
    }, 2000);

    setInterval(() => {
     // window.location.reload();
    }, 2000);
  }else{
    loading.value = false;
    notification.value.createSuccess = true;
    notification.value.message = 'Erro ao cadastrar usuário';
    notification.value.color = 'error';
  }
};

const closeAlert = () => {
  notification.value.createSuccess = false;
};

</script>

<template>
  <div v-if="loading" >
    <Loading />
  </div>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-toolbar flat color="#FFF">
              <v-toolbar-title class="">Cadastro de Alunos</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-card-title>
          <v-form @submit="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.name" label="Nome" :rules="nameRules" variant="outlined"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.ra" label="RA" :rules="raRules" variant="outlined" required></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.cpf" label="CPF" :rules="cpfRules" variant="outlined"
                    :value="useCpfMask(user.cpf)" required></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.email" label="E-mail" :rules="emailRules" variant="outlined"
                    required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="12" sm="12">
                  <v-text-field v-model="user.password" label="Senha" :rules="passwordRules" variant="outlined" required
                    type="password"></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-3 mb-3 ml-1 d-flex flex-row-reverse">
                <v-btn type="submit" class="mr-2" color="primary">
                  Salvar
                </v-btn>
                <router-link class="" to="/">
                  <v-btn type="button" class="ml-2 mr-2">
                    Cancelar
                  </v-btn>
                </router-link>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="notification.createSuccess" :color="notification.color" top>
    {{ notification.message }}
  </v-snackbar>
</template>


