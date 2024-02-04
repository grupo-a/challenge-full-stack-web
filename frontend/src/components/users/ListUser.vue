<script lang="ts">
import axios from 'axios';
import { User } from '../../types/user.type';

type paramsSearch = {
  page?: number;
  itemsPerPage?: number;
}

export default {
  data() {
    return {
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
    deleteItem(item: User) {
      this.deleteConfirmation = true;
      this.deleteConfirmationId = item.id;
    },
    confirmDelete() {
      axios.delete(`/users/${this.deleteConfirmationId}`,
        { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyYSI6Ijc0NTQyNDQtNzhSVFIiLCJuYW1lIjoiSm9hbyBTYW50b3MiLCJlbWFpbCI6Imphb0BnbWFpbC5jb20iLCJzdWIiOiJlMTk4NGViMi1kOGQ5LTRmOGUtYTVmMS1kMDAwZWM1ZjIzZmEiLCJhdXRob3JpemF0aW9uIjpbInVzZXIuZGVsZXRlIl0sImlhdCI6MTcwNjg3ODI0NiwiZXhwIjoxNzA3NDgzMDQ2fQ.5njiVF-Ykt0OrnC63fo3cZ4Hdpesq_Cs5-MIg60hZSw` } }
      ).then(response => {
        this.deleteConfirmation = false;
        this.deleteSuccess = true;
        this.fetchUsers({ page: this.current_page, itemsPerPage: this.itemsPerPage });
      })
        .catch(error => {
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
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="deleteConfirmation" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this user?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="confirmDelete">Yes</v-btn>
          <v-btn color="error" @click="cancelDelete">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="deleteSuccess" color="success" top>
      User deleted successfully!
      <v-btn @click="deleteSuccess = false">Close</v-btn>
    </v-snackbar>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="users"
      :loading="loading"
      item-value="name"
      no-data-text="Não há dados disponíveis"
      @update:options="fetchUsers">
      <template v-slot:top>
        <v-toolbar flat color="#FFF">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa por nome..." single-line hide-details
            @input="searchUsers">
          </v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link :to="`/users/${item.id}`">
          <v-btn small class="mr-2">
            <v-icon small class="mr-2 danger">mdi-pencil</v-icon>
            Editar</v-btn>
        </router-link>
        <v-btn danger small @click="deleteItem(item)">
          <v-icon small class="mr-2">mdi-delete</v-icon>
          Excluir
        </v-btn>
      </template>
    </v-data-table-server>
  </div>
</template>



