<template>
  <div class="container">
    <div class="txt-search">
      <label for="search">
        <input type="text" v-model="txtSearch">
      </label>
      <button @click="serachStudent" class="search">Pesquisar</button>
    </div>
    <table class="consulta">
      <tr class="">
        <td>Ra</td>
        <td>Nome</td>
        <td>CPF</td>
        <td>E-mail</td>
      </tr>
      <!-- Dinamico nessa parte -->
      <p v-if="listStudents.length === 0">Nenhum estudante encontrado</p>
      <tr v-for="(student) in listStudents" :key="student.id">
        <td class="td-bottom">{{student.ra}}</td>
        <td class="td-bottom">{{student.name}}</td>
        <td class="td-bottom">{{student.cpf}}</td>
        <td class="td-bottom"> {{student.email}} </td>
        <td>
          <button type="button" class="edit" @click='to="/cadastrar"'>
            [editar]
          </button>
          <button type="button" @click="deleteStudent(student)" class="edit">[excluir]</button>
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
      update: false,
    };
  },
  mounted() {
    this.requestApi();
  },
  methods: {
    requestApi() {
      api.get('/').then((response) => {
        this.listStudents = response.data;
      });
    },

    serachStudent() {
      if (!this.txtSearch !== '') {
        const filtro = [...this.listStudents].filter((student) => (
          student.name.toLowerCase().includes(this.txtSearch.toLowerCase())
        ));
        this.listStudents = filtro;
        this.txtSearch = '';
      } else {
        console.log('fiudshfuisd');
        api.get('/').then((response) => {
          this.listStudents = response.data;
        });
      }
    },

    deleteStudent(student) {
      api.delete(`/ ${student.id}`);
      this.requestApi();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 650px;
  margin: auto;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 10px 5px 30px 10px;
}

.consulta {
  text-align: center;
  padding: 10px
}

.td-bottom {
  border-bottom: 1px solid rgb(221, 218, 218);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}

input {
  width: 50%;
  height: 25px;
  border-radius: 5px;
}

.search {
  background-color: rgb(204, 13, 13);
  border-radius: 5px;
  margin: 2px;
  color: white;
  font-weight: 900;
  padding: 6px 15px;
  cursor: pointer;
}

.edit {
  border: none;
  background: none;
  cursor: pointer;
}

.txt-search {
  text-align: center;
}

</style>
