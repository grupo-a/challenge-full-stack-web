<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline mt-5">
         Bem-vindo ao painel de matrículas!
        </v-card-title>
        <v-card-text>
          <p>Aqui você pode cadastrar e editar os alunos, bem como deletá-los e listá-los.</p>
          <p>
            Para navegar, basta acessar o menu lateral.
          </p>
          <hr class="my-3">
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
