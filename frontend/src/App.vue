<template>
  <v-app>
    <v-navigation-drawer app absolute dark src="./assets/livros.jpg" permanent>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar class="white">
            <v-img src="./assets/logo.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>Módulo Acadêmico</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Alunos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <div>Consulta de alunos</div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="mt-3">
        <v-row>
          <v-col>
            <v-btn color="secondary" class="white--text">Cadastrar Aluno</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-title>
              Alunos
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
              :loading="loading"
              loading-text="Carregando..."
              no-data-text="Nenhum registro encontrado"
              no-results-text="Nenhum registro correspondente encontrado"
              :headers="headers"
              :items="desserts"
              :search="search"
              :footer-props="{
                'items-per-page-all-text': 'Todos',
                'items-per-page-text': 'Alunos por página',
              }"
            >
              <template v-slot:[`footer.page-text`]="items">
                {{ items.pageStart }} - {{ items.pageStop }} de
                {{ items.itemsLength }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
      <!-- <HelloWorld /> -->
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

export default {
  ra: 'App',

  components: {
    //HelloWorld,
  },

  data: () => ({
    search: '',
    loading: false,
    headers: [
      {
        text: 'Registro Acadêmico',
        value: 'ra',
      },
      { text: 'Nome', value: 'name' },
      { text: 'CPF', value: 'cpf' },
      { text: 'Ações', value: 'action' },
    ],
    desserts: [
      {
        ra: 101235,
        name: 'Paula Souza',
        cpf: '121.999.999-99',
        action: '[Editar] [Excluir]',
      },
      {
        ra: 111687,
        name: 'João Silva',
        cpf: '122.999.999-99',
        action: '[Editar] [Excluir]',
      },
      {
        ra: 111365,
        name: 'Marina Miranda',
        cpf: '123.999.999-99',
        action: '[Editar] [Excluir]',
      },
      {
        ra: 101299,
        name: 'Maurício Souza',
        cpf: '124.999.999-99',
        action: '[Editar] [Excluir]',
      },
    ],
  }),
};
</script>
