<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router';
import Notification from '@/components/Notification.vue';
import FormUser from '@/components/users/FormUser.vue';

const route = useRoute();

const userId: string = route.params.id.toString();

const notification = ref({
  editSuccess: false,
  message: '',
  color: 'success'
});

const loading = ref(false);

const submitForm = async (value: any) => {
  const userId = route.params.id;

  loading.value = true;
  try {
    const response = await axios.patch(`/users/${userId}`, value);

    if (response.status === 200) {
      setInterval(() => {
        loading.value = false;
        notification.value.editSuccess = true;
        notification.value.message = 'Aluno atualizado com sucesso';
        notification.value.color = 'success';
      }, 2000);
    } else {
      loading.value = false;
      notification.value.editSuccess = true;
      notification.value.message = 'Erro ao atualizar o aluno';
      notification.value.color = 'error';
    }
  } catch (error) {
    loading.value = false;
    notification.value.editSuccess = true;
    notification.value.message = 'Erro ao atualizar aluno! Por favor verifique os campos';
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
              <v-toolbar-title class="">Atualização de Aluno</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-card-title>
          <FormUser
          :submitForm="submitForm"
          action="edit"
          :userId="userId" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="notification.editSuccess">
    <notification
    :messege="notification.message"
    :openNotification="notification.editSuccess"
    :color="notification.color"
    />
  </div>
</template>


