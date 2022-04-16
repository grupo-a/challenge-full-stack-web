<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-fifth">
      <MenuBar />
    </div>
    <div class="column is-three-fifth">
      <StudentForm v-if="openForm" @closeForm="closeStudentForm" :formMode="formMode"/>
      <SearchStudent @createStudent="openStudentForm('Create')"/>
      <StudentsTable :studentsList="studentsList" @updateStudentsList="getStudents" @updateStudent="openStudentForm('Edit')"/>
    </div>
  </main>
</template>

<script>
import MenuBar from "./components/MenuBar.vue";
import SearchStudent from "./components/SearchStudent.vue";
import StudentsTable from "./components/StudentsTable.vue";
import StudentForm from "./components/StudentForm.vue"
const axios = require('axios')

export default {
  name: 'App',
  components: {
    MenuBar,
    SearchStudent,
    StudentsTable,
    StudentForm
  },
  data() {
    return {
      studentsList: [],
      openForm: false,
      formMode: ''
    }
  },
  methods: {
    async getStudents() {
      await axios.get('http://localhost:3000/students')
        .then( res => {
          this.studentsList = res.data.content
        });
    },
    openStudentForm(mode) {
      this.openForm = true;
      this.formMode = mode
    },
    closeStudentForm() {
      this.openForm = false;
    }
  },
  mounted() {
    this.getStudents();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
