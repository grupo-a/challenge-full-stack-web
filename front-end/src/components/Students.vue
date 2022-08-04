<template>
  <div class="hello">
    <div>
      <label for="search">
        <input type="text" v-model="txtSearch">
      </label>
      <button @click="serachStudent">Pesquisar</button>
      <p>{{txtSearch}}</p>
    </div>
    <table>
      <tr>
        <td>Ra</td>
        <td>Nome</td>
        <td>CPF</td>
        <td>E-mail</td>
      </tr>
      <!-- Dinamico nessa parte -->
      <tr v-for="(student) in listStudents" :key="student.id">
        <td>{{student.ra}}</td>
        <td>{{student.name}}</td>
        <td>{{student.cpf}}</td>
        <td> {{student.email}} </td>
        <td>
          <button type="button">[editar]</button>
          <button type="button">[excluir]</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import api from '@/RequestApi/api';

export default {
  name: 'StudentsData',
  data() {
    return {
      listStudents: [],
      txtSearch: '',
    };
  },
  mounted() {
    api.get('/').then((response) => {
      this.listStudents = response.data;
    });
  },
  methods: {
    serachStudent: () => {
      console.log('filtro');
      const filtro = [...this.listStudents].filter((student) => (
        student.name.toLowerCase().inclides(this.txtSearch)
      ));
      this.listStudents = filtro;
      console.log(this.listStudents);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
