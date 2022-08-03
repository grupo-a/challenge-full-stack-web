<template>
<div>
  <form>
    <label for="ra">
      Ra:
      <input type="text" id="ra" />
    </label>

    <label for="nome">
      Nome:
      <input type="text" id="nome" />
    </label>

    <label for="cpf">
      CPF:
      <input type="text" id="cpf" />
    </label>

    <label for="email">
      E-mail:
      <input type="email" id="email" />
    </label>
  </form>
</div>
</template>

<script>
// import api from '@/RequestApi/api';

export default {
  name: 'CadastroStudents',
  data() {
    return {
      listStudents: [],
    };
  },
  // mounted() {
  //   api.get('/').then((response) => {
  //     this.listStudents = response.data
  //   });
  // },
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
