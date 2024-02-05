<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import useCpfMask from '../../helpers/maskCpf';

const props = defineProps({
  action: {
    type: String,
    default: '',
  },
  submitForm: {
    type: Function,
    default: () => { },
  },
  userId: {
    type: String,
    default: '',
  },
});

const user = ref({
  ra: '',
  cpf: '',
  email: '',
  name: '',
  password: '',
});

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

onMounted(() => {
  const userId = props.userId;

  if (props.action === 'register') return;
  axios.get(`/users/${userId}`)
    .then(response => {
      user.value = response.data;
    })
    .catch(error => {
      console.error(error);
    });
});

const submitFormUser = async (e: Event) => {
  e.preventDefault();
  props.submitForm(user.value);
};

</script>

<template>
  <v-form @submit="submitFormUser">
    <v-container>
      <v-row>
        <v-col cols="12" lg="6" sm="6">
          <v-text-field v-model="user.name" label="Nome" :rules="nameRules" variant="outlined" required></v-text-field>
        </v-col>
        <v-col cols="12" lg="6" sm="6">
          <v-text-field v-model="user.email" label="E-mail" :rules="emailRules" variant="outlined"
            required></v-text-field>
        </v-col>
        <v-col cols="12" lg="6" sm="6">
          <v-text-field v-model="user.ra" label="RA" :rules="raRules" :disabled="props.action === 'edit'" variant="outlined" required></v-text-field>
        </v-col>
        <v-col cols="12" lg="6" sm="6">
          <v-text-field v-model="user.cpf" label="CPF" :rules="cpfRules" :disabled="props.action === 'edit'" variant="outlined" :value="useCpfMask(user.cpf)"
            required></v-text-field>
        </v-col>

      </v-row>
       <div v-if="props.action === 'register'">
        <v-row>
            <v-col cols="12" lg="12" sm="12">
              <v-text-field v-model="user.password" label="Senha" :rules="passwordRules" variant="outlined" required
                type="password"></v-text-field>
            </v-col>
        </v-row>
      </div>
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
</template>
