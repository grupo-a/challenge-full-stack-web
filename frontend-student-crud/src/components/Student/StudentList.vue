<template>
  <v-container>
    <h1>{{ name }}</h1>
    <br />
    <v-btn to="/estudante/cadastro">Cadastrar</v-btn>
    <br />
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="students"
      :single-select="singleSelect"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      loading-text="Carregando..."
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import service from '@/services/students-service';

export default {
  mounted() {
    this.read();
  },

  methods: {
    read() {
      this.loading = true;
      service.getStudents().then((students) => {
        this.students = students.data;
        this.loading = false;
      });
    },
    editItem(student) {
      console.log(student);
      alert('Em breve!');
    },
    deleteItem(student) {
      console.log(student);
      alert('Em breve!');
    },
  },

  data: () => ({
    name: 'Lista de Estudantes',
    singleSelect: false,
    selected: [],
    loading: null,
    headers: [
      { text: 'RA', value: 'id' },
      { text: 'NOME', value: 'name' },
      { text: 'EMAIL', value: 'email' },
      { text: 'CPF', value: 'cpf' },
      { text: 'DATA CRIAÇÃO', value: 'createdAt' },
      { text: 'DATA ATUALIZAÇÃO', value: 'updatedAt' },
      { text: 'AÇÕES', value: 'actions', sortable: false },
    ],
    students: [],
  }),
};
</script>
