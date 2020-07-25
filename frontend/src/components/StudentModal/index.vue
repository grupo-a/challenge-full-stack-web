<template>
  <v-card>
    <v-card-title>
      <v-layout align-center>
        <span class="headline">{{ modalTitle }} Aluno</span>

        <v-col>
          <v-text-field
            v-model="editedItem.enrollment_id"
            label="Registro Acadêmico"
            outlined
            readonly
            dense
            disabled
            hide-details
          ></v-text-field>
        </v-col>
      </v-layout>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-container>
        <v-row>
          <v-col cols="12" class="sections">
            <v-text-field
              v-model="editedItem.name"
              label="Nome"
              outlined
              :error-messages="errorMessageName"
              @click="errorMessageName = ''"
            ></v-text-field>
          </v-col>

          <v-col cols="6" class="sections">
            <v-text-field
              v-model="editedItem.cpf"
              v-cpf:model="editedItem.cpf"
              label="CPF"
              :rules="[rules.cpf]"
              outlined
              validate-on-blur
              :error-messages="errorMessageCpf"
              @click="errorMessageCpf = ''"
            ></v-text-field>
          </v-col>

          <v-col cols="6" class="sections">
            <v-text-field
              v-model="editedItem.email"
              label="Email"
              :rules="[rules.email]"
              outlined
              validate-on-blur
              :error-messages="errorMessageEmail"
              @click="errorMessageEmail = ''"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="blue darken-1"
        text
        @click="close">
          Cancelar
        </v-btn>

      <v-btn
        :loading="loading"
        color="blue darken-1"
        text
        @click="save">
          Salvar
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./scripts.js"></script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>