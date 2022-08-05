<template>
  <div class="home">
    <CadastroStudents msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CadastroStudents from '@/components/Cadastrar.vue';

export default {
  name: 'HomeView',
  components: {
    CadastroStudents,
  },
};
</script>
