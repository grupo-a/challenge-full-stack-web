<template>
  <div>
    <StudentsComponent />
    <SidebarComponent />
  </div>
</template>

<script>
  import StudentsComponent from '../components/StudentsComponent'
  import SidebarComponent from '../components/SidebarComponent'

  export default {
    name: 'Home',

    components: {
      StudentsComponent,
      SidebarComponent
    },
  }
</script>
