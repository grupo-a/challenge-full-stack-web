<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-fifth">
      <MenuBar />
    </div>
    <div class="column is-three-fifth">
      <SearchStudent />
    </div>
  </main>
</template>

<script>
import MenuBar from "./components/MenuBar.vue";
import SearchStudent from "./components/SearchStudent.vue";


export default {
  name: 'App',
  components: {
    MenuBar,
    SearchStudent
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
