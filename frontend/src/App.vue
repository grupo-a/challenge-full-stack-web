<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://www.grupoa.com.br/hs-fs/hubfs/grupoa-logo.png?width=866&name=grupoa-logo.png"
          transition="scale-transition"
          width="60"
        />                                      
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.grupoa.com.br/"
        target="_blank"
        text
      >
        <span class="mr-2">Visite nosso site</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
    
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>email</th>
          <th>RA</th>
          <th>CPF</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- <tr v-for="cadastro of cadastros" :key="cadastro.id"> -->
          <td>nome</td>
          <td>email</td>
          <td>RA</td>
          <td>CPF</td>
        </tr>
      </tbody>
    </table>

      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Cadastro from './services/cadastros'

export default {
  name: 'App',

  components: {
    Home
  },

  data () {
    return {
      cadastros: []
    }
  },
  mounted() {
    Cadastro.listar().then(resposta => {
      console.log("AGORA SIMM!!")
      console.log(resposta)
      // this.cadastros = resposta.data
    })
  }
};
</script>
