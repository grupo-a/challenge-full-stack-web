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

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Cadastrar novo aluno
        </h2>
      </v-col>

      <MultiplosEventos />
      <Reutilizacao />

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Alunos cadastrados
        </h2>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Excluir cadastro do aluno
        </h2>
        <v-row justify="center">
        </v-row>
      </v-col>      

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Editar cadastro do aluno
        </h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in editar"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import MultiplosEventos from './MultiplosEventos.vue'
  import Reutilizacao from './Reutilizacao.vue'

  export default {
    name: 'HelloWorld',
    components: {
      MultiplosEventos,
      Reutilizacao
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
