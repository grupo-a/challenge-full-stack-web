<template>
  <v-dialog :value="value" max-width="570px">
    <v-card>
      <v-card-title class="headline">Tem certeza de que deseja deletar este registro?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="reject">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="accept">Confirmar</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script type="text/javascript" src="./script.js" />
