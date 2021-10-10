<template>
  <div>
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

      <v-col>
        <h1 class="display-1 font-weight-bold mb-1">
          Seja bem vindo!
        </h1>
          <p>Faça o login e comece seus estudos</p>
      </v-col>

      <Form />
      <v-col>
        <p>
          <a>Clique aqui</a>
          e Realize sua Matrícula na Turma de Programação Web da instituição EdTech
        </p>
      </v-col>
      
    </v-row>
  </v-container>
    <Footer />
    <Consultar />
    <Footer />
    <LifeCycle />
    <MudarImagem />
    <MultiplosEventos />
    <Pessoa />
    <Picture />
    <Reutilizacao />
  </div>
</template>

<script>

  import Consultar from './Consultar.vue'
  import LifeCycle from './LifeCycle.vue'
  import MudarImagem from './MudarImagem.vue'
  import MultiplosEventos from './MultiplosEventos.vue'
  import Pessoa from './Pessoa.vue'
  import Picture from './Picture.vue'
  import Reutilizacao from './Reutilizacao.vue'
  import Form from './Form';
  import Footer from './Footer.vue'

  export default {
    name: 'Home',
    components: {
      LifeCycle,
      MudarImagem,
      MultiplosEventos,
      Pessoa,
      Picture,
      Reutilizacao,
      Form,
      Consultar, 
      Footer
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
