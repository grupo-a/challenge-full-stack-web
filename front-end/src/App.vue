<template>
  <nav class="container">
    <router-link to="/" class="students">Lista de Alunos</router-link>
    <router-link to="/cadastrar">
      <button type="button" class="cadastro">Cadastrar</button>
    </router-link>
  </nav>
  <router-view/>
</template>

<style scoped>
.container {
  text-align: center;
}
.students {
  margin: 117px;
  text-decoration: none;
  font-weight: 900;
  color: red;
}
.cadastro {
  background-color: rgb(204, 13, 13);
  border-radius: 5px;
  margin: 2px;
  color: white;
  font-weight: 900;
  padding: 6px 15px;
  cursor: pointer;
}
</style>
