<template>
  <div class="container">
    <div class="txt-search">
      <label for="search">
        <input type="text" v-model="txtSearch">
      </label>
      <button @click="serachStudent" class="search">Pesquisar</button>
    </div>

    <div v-if="listStudents.length > 0">
        <table class="consulta">
          <tr class="">
            <td>Registro acadêmico</td>
            <td>Nome</td>
            <td>CPF</td>
            <td>E-mail</td>
            <td>Ações</td>
          </tr>
          <!-- Dinamico nessa parte -->
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
    <div v-else class="consulta">
      <p>Sem dados de alunos</p>
    </div>
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

<style scoped>
.container {
  max-width: 850px;
  margin: auto;
  margin-top: 20px;
  box-shadow: 4px 8px 8px 8px rgba(0, 0, 0, 0.4);
  padding: 10px 5px 30px 10px;
}

.consulta {
  text-align: center;
  padding: 10px;
  width: 98%;
}

.td-bottom {
  border-bottom: 1px solid rgb(221, 218, 218);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  padding-top: 30px;
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
  padding-top: 20px;
}

.txt-search {
  text-align: center;
}
</style>
