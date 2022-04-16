<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-fifth">
      <MenuBar />
    </div>
    <div class="column is-three-fifth">
      <SearchStudent />
      <StudentsTable :studentsList="studentsList"/>
    </div>
  </main>
</template>

<script>
import MenuBar from "./components/MenuBar.vue";
import SearchStudent from "./components/SearchStudent.vue";
import StudentsTable from "./components/StudentsTable.vue";
const axios = require('axios')

export default {
  name: 'App',
  components: {
    MenuBar,
    SearchStudent,
    StudentsTable
  },
  data() {
    return {
      studentsList: []
    }
  },
  methods: {
    async getStudents() {
      await axios.get('http://localhost:3000/students')
        .then( res => {
          this.studentsList = res.data.content
        })
      console.log(this.studentsList)

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
