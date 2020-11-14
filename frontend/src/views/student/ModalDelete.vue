<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" color="red" icon>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-on="on" v-bind="attrs">
              mdi-trash-can
            </v-icon>
          </template>
          <span>Excluir</span>
        </v-tooltip>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Excluir Aluno</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-alert
            :value="notFound"
            color="red"
            border="top"
            dismissible
            icon="mdi-exclamation"
            transition="scale-transition"
          >
            Não foi encontrado um aluno com este id!
          </v-alert>

          Ao clicar em confirmar, todos os dados deste aluno serão excluidos. <br />
          Deseja prosseguir?
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="open = false">
          Cancelar
        </v-btn>
        <v-btn color="secondary" @click="deleteStudent">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import StudentService from '../../services/studentService';

export default Vue.extend({
  name: 'StudentDelete',
  props: {
    studentId: Number,
  },
  data() {
    return {
      open: false,
      notFound: false,
    };
  },
  methods: {
    async deleteStudent() {
      const id = this.studentId;
      const response = await StudentService.delete(id.toString());

      if (response.status === 404) {
        this.notFound = true;
      } else {
        const isDeleted = response.status === 200;

        this.$emit('delete-callback', { isDeleted, id });
        this.open = false;
      }
    },
  },
});
</script>
