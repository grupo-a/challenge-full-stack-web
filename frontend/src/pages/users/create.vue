<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import Loading from '@/components/Loading.vue';
import Notification from '@/components/Notification.vue';
import FormUser from '@/components/users/FormUser.vue';

const notification = ref({
  createSuccess: false,
  message: '',
  color: ''
});

const loading = ref(false);

const submitForm = async (value: any) => {
  loading.value = true;

  try {
    const response = await axios.post('/users', value);

    if (response.status === 201) {
      setInterval(() => {
        loading.value = false;
        notification.value.createSuccess = true;
        notification.value.message = 'Aluno cadastrado com sucesso';
        notification.value.color = 'success';

      }, 2000);

      setInterval(() => {
        window.location.reload();
      }, 3000);
    } else {
      loading.value = false;
      notification.value.createSuccess = true;
      notification.value.message = 'Erro ao cadastrar aluno';
      notification.value.color = 'error';
    }
  } catch (error) {
    loading.value = false;
    notification.value.createSuccess = true;
    notification.value.message = 'Erro ao cadastrar aluno! Por favor verifique os campos';
    notification.value.color = 'error';
  }
};

</script>

<template>
  <div v-if="loading">
    <Loading />
  </div>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-toolbar flat color="#FFF">
              <v-toolbar-title class="">Cadastro de Aluno</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-card-title>
          <FormUser :submitForm="submitForm" action="register" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="notification.createSuccess">
    <notification
      :messege="notification.message"
      :openNotification="notification.createSuccess"
      :color="notification.color"
      />
  </div>
</template>


