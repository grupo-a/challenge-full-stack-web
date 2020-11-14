<template>
  <v-text-field
    @keyup="handleKeyUp"
    append-icon="mdi-magnify"
    type="text"
    name="input-10-1"
    label="Digite sua busca"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchTextInput',
  data() {
    return {
      debounce: 0,
    };
  },
  methods: {
    // debounce search
    handleKeyUp(event: KeyboardEvent) {
      const text = (event.target as HTMLInputElement).value;

      clearTimeout(this.debounce);

      const timeout = setTimeout(() => {
        this.$emit('trigger-search', text);
      }, 1000);

      this.debounce = timeout;
    },
  },
});
</script>
