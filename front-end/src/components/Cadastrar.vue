<template>
<div class="container">
  <form>
    <div class="input">
      <label for="ra">
        Ra:
        <input type="text" v-model="ra" id="ra" />
      </label>
    </div>

    <div class="input">
      <label for="nome">
        Nome:
        <input type="text" v-model="nome" id="nome" />
      </label>
    </div>

    <div class="input">
      <label for="cpf">
        CPF:
        <input type="text" v-model="cpf" id="cpf" />
      </label>
    </div>

    <div class="input">
      <label for="email">
        E-mail:
        <input type="email" v-model="email" id="email" />
      </label>
    </div>

    <div class="">
      <label for="submit">
        <input type="submit" v-on:click="addStudent" />
      </label>
    </div>

  </form>
</div>
</template>

<script>
// import api from '@/RequestApi/api';

export default {
  name: 'CadastroStudents',
  data() {
    return {
      ra: '',
      nome: '',
      cpf: '',
      email: '',
    };
  },
  methods: {
    addStudent: (e) => {
      e.preventDefault();
      console.log(this.ra);
      // api.post('/', {
      //   ra: this.ra, name: this.nome, cpf: this.cpf, email: this.email,
      // });
    },
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
.container {
  max-width: 400px;
  margin: auto;
}
.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
input {
  margin-right: 0px;
}
</style>
