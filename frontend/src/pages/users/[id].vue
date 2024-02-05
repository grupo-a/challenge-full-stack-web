<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router';
import useCpfMask from '../../helpers/maskCpf';

const route = useRoute();

const user = ref({
  ra: '',
  cpf: '',
  email: '',
  name: '',
});

const notification = ref({
  editSuccess: false,
  message: '',
  color: ''
});

const loading = ref(false);

const emailRules = [
  (v: string) => !!v || 'E-mail é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail não é válido',
];

const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
];


onMounted(() => {
  const userId = route.params.id;
  axios.get(`/users/${userId}`)
    .then(response => {
      user.value = response.data;
    })
    .catch(error => {
      console.error(error);
    });
});

const submitForm = async (e: Event) => {
  e.preventDefault();
  const userId = route.params.id;

  loading.value = true;
  const response = await axios.patch(`/users/${userId}`, user.value)

if (response.status === 200) {
    setInterval(() => {
      loading.value = false;
      notification.value.editSuccess = true;
      notification.value.message = 'Aluno atualizado com sucesso';
      notification.value.color = 'success';
    }, 2000);
  }else{
    loading.value = false;
    notification.value.editSuccess = true;
    notification.value.message = 'Erro ao atualizar o aluno';
    notification.value.color = 'error';
  }
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
              <v-toolbar-title class="">Atualização de Aluno</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-card-title>
          <v-form @submit="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.name" label="Nome" variant="outlined"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.email" label="E-mail" :rules="emailRules" variant="outlined"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.ra" label="RA" disabled variant="outlined" required></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6">
                  <v-text-field v-model="user.cpf" label="CPF" disabled variant="outlined"
                    :value="useCpfMask(user.cpf)" required></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-3 mb-3 ml-1 d-flex flex-row-reverse">
                <v-btn type="submit" class="mr-2" color="primary">
                  Salvar
                </v-btn>
                <router-link class="" to="/">
                  <v-btn type="button" color="red-darken-1" class="ml-2 mr-2">
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
  <v-snackbar v-model="notification.editSuccess" :color="notification.color" top>
    {{ notification.message }}
  </v-snackbar>
</template>


