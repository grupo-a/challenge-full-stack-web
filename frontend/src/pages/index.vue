<script lang="ts" setup>
import ListUser from '@/components/users/ListUser.vue';
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-toolbar flat color="#FFF">
              <v-toolbar-title class="">Consulta de Alunos</v-toolbar-title>
              <v-spacer></v-spacer>
              <router-link to="/users/create">
                <v-btn color="primary">Cadastrar Aluno</v-btn>
              </router-link>
            </v-toolbar>
          </v-card-title>
          <div>
            <ListUser />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


