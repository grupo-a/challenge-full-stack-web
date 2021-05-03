<template>
  <div>
    <card
      :title="title"
    >
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-if="isEdit"
              v-model="item.id"
              label="Matrícula"
              outlined
              clearable
              dense
              disabled
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
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
              v-model="item.tax"
              label="CPF"
              outlined
              clearable
              dense
              :disabled="!!isEdit"
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
        </v-row>
      </v-form>
      <v-col class="text-right mt-5">
        <v-btn type="submit" @click="handleSubmit"> Salvar</v-btn>
      </v-col>
    </card>
  </div>
</template>

<script type="text/javascript" src="./script.js" />
