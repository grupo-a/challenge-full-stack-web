<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  messege :  {
    type: String,
    default: '',
  },
  openNotification:  {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'success',
  },

});

const timeout = 2000;
const open = ref(true);

</script>

<template>
  <v-snackbar v-model="open" :color="props.color" :timeout="timeout" top>
    {{props.messege}}
  </v-snackbar>
</template>
