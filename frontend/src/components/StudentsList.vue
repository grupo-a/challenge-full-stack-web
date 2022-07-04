<template>
  <div>
    <v-row>
      <v-col cols="8">
        <v-text-field 
          class="pl-10" 
          outlined
          autofocus="true"
          v-model="search"
          append-icon="mdi-magnify"
          label="Digite sua busca"
          single-line
          hide-details
        />
      </v-col>

      <v-col class="text-center" cols="4">
        <v-btn dark x-large color="success">Cadastrar Aluno</v-btn>
      </v-col>
    </v-row>

    <br />

    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: "StudentsList",
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Registro Acadêmico',
            align: 'center',
            sortable: true,
            value: 'ra',
          },
          {
            text: 'Nome',
            align: 'center',
            sortable: true,
            value: 'name',
          },
          {
            text: 'CPF',
            align: 'center',
            sortable: true,
            value: 'cpf',
          },
          {
            text: 'Ações',
            align: 'center',
            sortable: true,
            value: 'actions',
          },
        ],
        students: [
          {
            ra: '1111111',
            name: 'Lucas',
            cpf: '111000111100',
            actions: [
              '[Editar]',
              '[Excluir]'
            ]
          },
          {
            ra: '2222222',
            name: 'Fulano',
            cpf: '2222222222',
            actions: [
              '[Editar]',
              '[Excluir]'
            ]
          }
        ],
      }
    },
  }
</script>