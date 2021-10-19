<template>
  <v-dialog v-model="show" persistent max-width="500">
    <v-card>
      <v-card-title>Exlusão do estudante {{student.name}}</v-card-title>
      <v-card-text class="text-left">Deseja realmente excluir o estudante? Ao excluir os seus dados serão completamente removidos.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" class="no-uppercase" text @click="close">Cancelar</v-btn>
        <v-btn color="green darken-1" class="no-uppercase" text @click="deleteStudent">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogDelete',

  props: {
    show: Boolean,
    student: Object
  },

  methods: {
    deleteStudent () {
      this.axios
        .delete(`/students/${this.student.id}`)
        .then(response => {
          this.showNotification({
            show: true,
            text: response.data.msg,
            color: 'success'
          })
          this.close()
          this.$emit('reload')
        })
        .catch(err => {
          this.loading = false
          this.showNotification({
            show: true,
            text: err.response.data.msg,
            color: 'error'
          })
        })
    },

    close () {
      this.$emit('close', false)
    }
  }
}
</script>
