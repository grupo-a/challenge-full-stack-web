<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="5"
    class="elevation-1"
  >
  <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lista de Alunos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-autocomplete
          dense
          v-model="select"
          :loading="loading"
          :items="students"
          :search-input.sync="search"
          cache-items
          class="mx-3"
          flat
          hide-no-data
          hide-details
          label="Pesquisar"
          solo-inverted
        ></v-autocomplete>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              to="students/action"
            >
              Novo Cadastro
            </v-btn>
          </template>
        </v-dialog>
        <DeleteMessage :value="dialogDelete" @accept="deleteConfirm" @reject="closeDelete"/>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="updateStudent(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-icon
        @click="getStudents"
      >
        mdi-refresh
      </v-icon>
    </template>
  </v-data-table>
</template>

<script type="text/javascript" src="./script.js" />
