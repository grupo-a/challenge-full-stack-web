<template>
  <v-card>
    <v-card-title>
      <v-dialog
        v-model="dialog"
        max-width="600px"
        scrollable
        :hide-overlay="$vuetify.breakpoint.smAndDown"
        :fullscreen="$vuetify.breakpoint.smAndDown"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            rounded
            color="primary"
            @click="generateEnrollmentId()"
          >
            <v-icon left>mdi-plus</v-icon> Novo Aluno
          </v-btn>
        </template>

        <student-modal
          :modal-title="modalTitle"
          :edited-item="editedItem"
          @close="close"
        />
      </v-dialog>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="$getterStudents"
      :items-per-page="5"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.cpf="{ item }">
        <span>{{ maskedCpf(item.cpf) }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>

        <v-btn
          icon
          small
          @click="deleteItem(item)"
        >
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script src="./scripts.js"></script>