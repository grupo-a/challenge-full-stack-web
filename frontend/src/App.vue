<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-fifth">
      <MenuBar />
    </div>
    <div class="column is-three-fifth">
      <StudentForm v-if="openForm" @closeForm="closeStudentForm" :formMode="formMode" :student="student" />
      <SearchStudent @createStudent="openStudentForm('Create')" />
      <StudentsTable :studentsList="studentsList" @updateStudentsList="getStudents" @updateStudent="openStudentForm" />
      <Pagination :totalPages="totalPages" :perPage="10" :currentPage="currentPage" @pageChanged="handlePageChange" />
    </div>
  </main>
</template>

<script>
import MenuBar from "./components/MenuBar.vue";
import SearchStudent from "./components/SearchStudent.vue";
import StudentsTable from "./components/StudentsTable.vue";
import StudentForm from "./components/StudentForm.vue"
import Pagination from "./components/Pagination.vue";
const axios = require('axios')

export default {
  name: 'App',
  components: {
    MenuBar,
    SearchStudent,
    StudentsTable,
    StudentForm,
    Pagination
},
  data() {
    return {
      studentsList: [],
      openForm: false,
      formMode: '',
      student: null,
      currentPage: 1,
      paginationParams: {}
    }
  },
  methods: {
    onPageChange(page) {
      console.log(page)
      this.currentPage = page;
    },
    async getStudents() {
      await axios.get('http://localhost:3000/students')
        .then(res => {
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.currentPage + 1;
          this.studentsList = res.data.content;
          this.paginationParams.order = res.data.order;
          this.paginationParams.orderBy = res.data.orderBy;
        });
    },
    openStudentForm(mode, student) {
      if (student) {
        this.student = student
      }
      this.openForm = true;
      this.formMode = mode
    },
    closeStudentForm() {
      this.openForm = false;
      this.student = null
      this.getStudents();
    },
    async handlePageChange(value) {
      await axios.get('http://localhost:3000/students', {
        params: {
          page: value - 1,
          order: this.paginationParams.order,
          orderBy: this.paginationParams.orderBy
        }
      }).then(res => {
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage + 1;
        this.studentsList = res.data.content;
        this.paginationParams.order = res.data.order;
        this.paginationParams.orderBy = res.data.orderBy;
      })
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
