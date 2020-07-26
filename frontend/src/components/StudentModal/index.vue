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

          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
            class="sections"
          >
            <v-text-field
              v-model="editedItem.cpf"
              v-cpf:model="editedItem.cpf"
              label="CPF"
              outlined
              validate-on-blur
              :rules="[rules.cpf]"
              :readonly="isEdition"
              :disabled="isEdition"
              :error-messages="errorMessageCpf"
              @click="errorMessageCpf = ''"
            ></v-text-field>
          </v-col>

          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
            class="sections"
          >
            <v-text-field
              v-model="editedItem.email"
              label="Email"
              outlined
              validate-on-blur
              :rules="[rules.email]"
              :error-messages="errorMessageEmail"
              @click="errorMessageEmail = ''"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>

      <v-btn
        class="mr-1"
        color="blue darken-1"
        text
        @click="close">
          CANCELAR
        </v-btn>

      <v-btn
        :loading="loading"
        color="primary"
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