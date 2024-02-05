<script lang="ts">
import axios from 'axios';
import { User } from '../../types/user.type';
import { useUserStore } from '../../store/user'
import useCpfMask from '../../helpers/maskCpf';

type paramsSearch = {
  page?: number;
  itemsPerPage?: number;
}

export default {
  data() {
    return {
      user: useUserStore(),
      users: <User[]>[],
      headers: [
        { title: 'Registro Acadêmico', text: 'Registro Acadêmico', value: 'ra' },
        { title: 'Nome', text: 'Nome', value: 'name' },
        { title: 'CPF', text: 'CPF', value: 'cpf' },
        { title: '#', text: 'Actions', value: 'actions', sortable: false },
      ],
      itemsPerPage: 10,
      totalItems: 0,
      current_page: 1,
      loading: false,
      search: '',
      deleteConfirmation: false,
      deleteConfirmationId: '',
      deleteSuccess: false,
    };
  },
  mounted() {
    this.fetchUsers({ page: 1, itemsPerPage: 10 });
  },
  methods: {
    fetchUsers({ page, itemsPerPage }: paramsSearch) {
      this.loading = true;
      axios.get(`/users?page=${page}&size=${itemsPerPage}`)
        .then(response => {
          this.users = response.data.data;
          this.totalItems = response.data.meta.total;
          this.itemsPerPage = response.data.meta.per_page;
        })
        .catch(error => {
          console.error(error);
        });
      this.loading = false;
    },

    editItem(item: User) {
      this.$router.push(`/users/${item.id}`);
    },

    deleteItem(item: User) {
      this.deleteConfirmation = true;
      this.deleteConfirmationId = item.id;
      const isAuthorization = this.user.authorization;
      console.log(isAuthorization);

    },

    confirmDelete() {
      axios.delete(`/users/${this.deleteConfirmationId}`,
        { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyYSI6Ijc0NTQyNDQtNzhSVFIiLCJuYW1lIjoiSm9hbyBTYW50b3MiLCJlbWFpbCI6Imphb0BnbWFpbC5jb20iLCJzdWIiOiJlMTk4NGViMi1kOGQ5LTRmOGUtYTVmMS1kMDAwZWM1ZjIzZmEiLCJhdXRob3JpemF0aW9uIjpbInVzZXIuZGVsZXRlIl0sImlhdCI6MTcwNjg3ODI0NiwiZXhwIjoxNzA3NDgzMDQ2fQ.5njiVF-Ykt0OrnC63fo3cZ4Hdpesq_Cs5-MIg60hZSw` } }
      ).then(response => {
        this.deleteConfirmation = false;
        this.deleteSuccess = true;
        this.fetchUsers({ page: this.current_page, itemsPerPage: this.itemsPerPage });
      }).catch(error => {
        console.error(error);
      });
    },

    cancelDelete() {
      this.deleteConfirmation = false;
      this.deleteConfirmationId = '';
    },

    searchUsers() {
      this.loading = true;
      axios.get(`/users?name=${this.search}`)
        .then(response => {
          this.users = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
      this.loading = false;
    },

    formatCpf(cpf: string) {
      return useCpfMask(cpf);
    },
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="deleteConfirmation" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar exclusão</v-card-title>
        <v-card-text>
          Tem certeza de que deseja excluir este aluno?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="confirmDelete">Sim, quero excluir!</v-btn>
          <v-btn color="red-darken-1" @click="cancelDelete">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="deleteSuccess" color="success" top>
      Aluno excluído com sucesso!
      <v-btn @click="deleteSuccess = false">Fechar</v-btn>
    </v-snackbar>


    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="users"
      :loading="loading"
      loading-text="Carregando..."
      item-value="name"
      no-data-text="Não há dados disponíveis"
      @update:options="fetchUsers">
      <template v-slot:top>
        <div class="d-flex flex-row-reverse align-center">
          <v-btn color="primary" class="pt-2 pb-2 ml-2 mr-2" @click="searchUsers">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-responsive max-width="344">
            <v-text-field
              v-model="search"
              label="Pesquisar por nome ..."
              single-line
              variant="underlined"
              class="mb-2"
              hide-details>
            </v-text-field>
          </v-responsive>

        </div>
      </template>
      <template v-slot:item.cpf="{ item }">
        {{ formatCpf(item.cpf) }}
      </template>
      <template v-slot:item.actions="{ item }">
          <v-icon @click="editItem(item)" small class="mr-2">mdi-pencil</v-icon>
          <v-icon color="red-darken-1" small @click="deleteItem(item)" danger class="mr-2">mdi-delete</v-icon>
      </template>
    </v-data-table-server>
  </div>
</template>



