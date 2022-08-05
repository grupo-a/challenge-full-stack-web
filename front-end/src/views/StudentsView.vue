<template>
  <div class="home">
    <StudentsData />
  </div>
</template>

<script>
// @ is an alias to /src
import StudentsData from '@/components/Students.vue';

export default {
  name: 'StudentsView',
  components: {
    StudentsData,
  },
};
</script>
