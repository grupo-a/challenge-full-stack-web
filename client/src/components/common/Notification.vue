<template>
  <v-snackbar
    v-model="notification.show"
    :timeout="3000"
    :color="notification.color"
    top
  >{{ notification.text }}</v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Notification',

  computed: {
    ...mapState(['notification'])
  }
}
</script>
