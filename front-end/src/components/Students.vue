<template>
  <div class="hello">
    <h1>teste</h1>
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
        <td>{{student.email}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import api from '@/RequestApi/api';

export default {
  name: 'HelloWorld',
  data() {
    return {
      listStudents: [],
    };
  },
  mounted() {
    api.get('/').then((response) => {
      this.listStudents = response.data;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
