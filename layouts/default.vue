<template>
  <div v-if='logon != true' class="login-container">
    <div class="login-image">
      <img src="https://maisaedu.com.br/hubfs/site-grupo-a/header-home-grupo-a.png" alt="Imagem de login">
    </div>
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">E-mail:</label>
          <input type="text" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>

  <v-app v-else-if=logon dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />     
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import sha256 from "sha256";

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      email: '',
      password: '',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Alunos',
          to: '/'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Teste Grupo A'
    }
  },
  computed: {
    ...mapGetters({
      logon: "auth/getLogon",

    }),


  },
  methods: {
    login() {

      const obj = {
        email: this.email,
        password: sha256(this.email + this.password).toUpperCase()
      };

      this.$store.dispatch("auth/login", obj).catch((e) => this.$toast.global.error(e.message));

    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-image {
  flex: 1;
  padding: 20px;
}

.login-image img {
  max-width: 100%;
  height: auto;
}

.login-box {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  margin-bottom: 20px;
}

.login-box form div {
  margin-bottom: 10px;
}

.login-box form label {
  display: block;
  font-weight: bold;
}

.login-box form input {
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.login-box form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-box form button:hover {
  background-color: #0056b3;
}
</style>
