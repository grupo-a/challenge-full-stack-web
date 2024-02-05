<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '../../store/user'
import parseTokenJwt from '../../helpers/parseTokenJwt'
import Notification from '@/components/Notification.vue';

const user = useUserStore()

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  toggleLogin: {
    type: Function,
    default: () => { },
  },
});

const loginModal = ref({
  ra: '',
  password: '',
});

const notification = ref({
  loginSuccess: false,
  loginSuccessMessage: 'Realizado com sucesso!',
  loginColor: 'success',
});

const login = async () => {
  try {
    const response = await axios.post('/auth/login', {
      ra: loginModal.value.ra,
      password: loginModal.value.password,
    });

    notification.value.loginSuccess = true;

    const token = response.data.token;

    document.cookie = `token=${token}; secure; SameSite=Strict`;

    const parse = parseTokenJwt(token);

    user.setUser({
      id: parse.sub,
      name: parse.name,
      email: parse.email,
      authorization: parse.authorization,
    });
    setTimeout(() => {
      loginModal.value = {
        ra: '',
        password: '',
      };
      props.toggleLogin();
    }, 2000);

  } catch (error) {
    console.error(error);
    notification.value.loginSuccess = true;
    notification.value.loginSuccessMessage = 'Erro ao realizar login';
    notification.value.loginColor = 'error';
  }
};

const logout = () => {
  document.cookie = 'token=; secure; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  user.setUser({
    id: '',
    name: '',
    email: '',
    authorization: [],
  });

};

</script>

<template>
  <v-dialog v-model="props.value" max-width="500px">

    <div v-if="user.name">
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <div class="d-flex justify-center">
            <h4>Usuário logado</h4>
          </div>
          <div class="d-flex justify-center">
            <v-btn class="ml-2 mb-2 mt-2" @click="logout" color="red-darken-1">Sair</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field v-model="loginModal.ra" label="RA" variant="outlined" required></v-text-field>
            <v-text-field v-model="loginModal.password" label="Senha" type="password" variant="outlined"
              required></v-text-field>
            <v-btn class="mb-2 mt-2" type="submit" color="primary">Login</v-btn>
            <v-btn class="ml-2 mb-2 mt-2" @click="toggleLogin" color="red-darken-1">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
  <div v-if="notification.loginSuccess">
    <notification
      :messege="notification.loginSuccessMessage"
      :openNotification="notification.loginSuccess"
      :color="notification.loginColor" />
  </div>
</template>


