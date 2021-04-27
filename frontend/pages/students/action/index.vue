<template>
  <div>
    <card
      title="Cadastro de Aluno"
    >
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="item.name"
              label="Nome"
              outlined
              clearable
              dense
              hide-details="auto"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="item.cpf"
              v-mask="'###.###.###-##'"
              label="CPF"
              outlined
              clearable
              dense
              hide-details="auto"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="item.email"
              label="Email"
              outlined
              clearable
              dense
              hide-details="auto"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-if="ok === true"
              v-model="item.phone"
              label="Matrícula"
              outlined
              clearable
              dense
              hide-details="auto"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </card>
    <action-buttons :buttons="actionButtonItems" />
  </div>
</template>

<script type="text/javascript" src="./script.js" />
