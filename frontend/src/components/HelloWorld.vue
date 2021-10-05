<template>
  <v-container>
    
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="'https://www.grupoa.com.br/hs-fs/hubfs/+a-22-22%20(1)-1.png?width=150&name=+a-22-22%20(1)-1.png'"
          class="my-2"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          Seja bem vindo!
        </h1>

        <p class="subheading font-weight-regular">
          Olá Aluno! Realize sua Matrícula na Turma de Programação Web da instituição EdTech,
          <br>para efetuar o login
          <a
            href=""
          >clique aqui</a>
        </p>
      </v-col>

      <Form />
      <MultiplosEventos />
      <Reutilizacao />

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Cadastrar novo aluno
        </h2>
          <li>Dado que estou na tela de Consulta de Alunos</li>
          <li>Quando clico em Cadastrar Aluno</li>
          <li>Então abre a tela de Cadastro do Aluno</li>
          <li>E exibe os campos obrigatórios vazios</li>
          <li>Dado que inseri dados válidos nos campos</li>
          <li>Quando clico em Salvar</li>
          <li>Então cria o novo aluno na base</li>
          <li>E retorna mensagem de sucesso</li>
          <li>Dado que inseri dados válidos nos campos</li>
          <li>Quando clico em Cancelar</li>
          <li>Então retorna para tela Consulta de Alunos</li>
          <li>E não persiste a gravação dos dados no banco</li>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Listar Alunos cadastrados
        </h2>
          <li>Dado que estou no Módulo Acadêmico</li>
          <li>Quando clico no menu Alunos</li>
          <li>Então abre a tela de Consulta de Alunos</li>
          <li>E exibe opção Cadastrar Aluno ao topo</li>
          <li>E lista dados dos alunos cadastrados</li>
          <li>E exibe opção Editar por aluno</li>
          <li>E exibe opção Excluir por aluno</li>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Editar cadastro do aluno
        </h2>
          <li>Dado que estou na listagem de alunos</li>
          <li>Quando clico em Editar aluno</li>
          <li>Então abre a tela de Cadastro do Aluno</li>
          <li>E exibe os campos do cadastro preenchidos</li>
          <li>E habilita alteração dos campos editáveis</li>
          <li>Dado que estou na tela de Cadastro do Aluno</li>
          <li>Quando clica em Salvar</li>
          <li>Então grava os dados editáveis na base</li>
          <li>Dado que estou na tela de Cadastro do Aluno</li>
          <li>Quando clica em Cancelar</li>
          <li>Então retorna para a tela de Consulta de Alunos</li>
          <li>E não persiste a gravação dos dados</li>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Excluir cadastro do aluno
        </h2>
        <li>Dado que estou na listagem de alunos</li>
        <li>Quando clico em Excluir aluno</li>
        <li>Então exibe a modal de confirmação de exclusão</li>
        <li>Dado que estou na modal de confirmação de exclusão</li>
        <li>Quando clico em Confirmar</li>
        <li>Então então exclui o registro do aluno</li>
        <li>Dado que estou na modal de confirmação de exclusão</li>
        <li>Quando clico em Cancelar</li>
        <li>Então então fecha a modal e não persiste a exclusão</li>
      </v-col>       

        <v-row justify="center">
          <h2>Canpos obrigatórios: </h2>
          <a
            v-for="(eco, i) in editar"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
          <br><br>
        </v-row>
    </v-row>
  </v-container>
</template>

<script>

  import MultiplosEventos from './MultiplosEventos.vue'
  import Reutilizacao from './Reutilizacao.vue'
  import Form from './Form';

  export default {
    name: 'HelloWorld',
    components: {
      MultiplosEventos,
      Reutilizacao,
      Form
    },
    data: () => ({
      editar: [
        {
          text: 'Nome',
          href: '',
        },
        {
          text: 'Email',
          href: '',
        },
        {
          text: 'RA ("chave única")',
          href: '',
        },
        {
          text: 'CPF',
          href: '',
        },
      ],
    }),
  }
</script>
