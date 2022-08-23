<template>
<div class="container">
  <h1 class="txt-cadastro">Cadastro de aluno</h1>
  <form @submit="enviarForm">
    <div class="input">
      <label for="ra" class="label">
        Ra:
        <input
          type="text"
          v-model="ra"
          id="ra"
        />
      </label>
      <!-- <p v-if="valid">Ra precisa ser numerico</p> -->
    </div>

    <div class="input">
      <label for="nome" class="label">
        Nome:
        <input type="text" v-model="nome" id="nome" />
      </label>
    </div>

    <div class="input">
      <label for="cpf" class="label">
        CPF:
        <input type="text" v-model="cpf" id="cpf" />
      </label>
    </div>

    <div class="input">
      <label for="email" class="label">
        E-mail:
        <input type="email" v-model="email" id="email" />
      </label>
    </div>

    <div class="">
      <button
        type="button"
      >
        <a href="/">Cancelar</a>
      </button>
      <button
        type="submit"
        :disabled="!(isValidEmail(email))"
      >
      Salvar
    </button>
    <div class="save-div" v-if="save">
      <p class="save">Estudante salvo com sucesso!</p>
    </div>
    </div>

  </form>
  <p v-if="error">Por Favor corrigir informações</p>
</div>
</template>

<script>
import api from '@/RequestApi/api';
import VueRouter from 'vue-router';

export default {
  name: 'CadastroStudents',
  data() {
    return {
      ra: '',
      nome: '',
      cpf: '',
      email: '',
      valid: false,
      disabled: true,
      error: false,
      save: false,
    };
  },
  methods: {
    validationRa(ra) {
      return !Number.isNaN(ra);
    },

    isValidEmail(email) {
      this.validationRa(this.ra);
      const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      return regex.test(email);
    },

    isSave() {
      this.save = false;
    },

    redirect() {
      VueRouter.push({ name: '/' });
    },

    enviarForm(e) {
      e.preventDefault();
      if (!this.nome || !this.cpf || !this.ra || !this.email) {
        this.error = true;
      } else {
        this.error = false;
      }

      if (!this.error) {
        this.error = false;

        api.post('/', {
          ra: this.ra, name: this.nome, cpf: this.cpf, email: this.email,
        });
        this.save = true;
        this.ra = '';
        this.nome = '';
        this.cpf = '';
        this.email = '';
        setTimeout(this.isSave, 2000);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 450px;
  margin: auto;
  box-shadow: 5px 6px 6px 5px rgba(0, 0, 0, 0.4);
  padding: 10px 5px 30px 10px;
  margin-top: 20px;
}
.txt-cadastro {
  text-align: center;
}

input {
  display: block;
  width: 90%;
  height: 25px;
  border-radius: 5px;
}
label {
  padding: 4px;
}

button {
  color: white;
  font-weight: 900;
  padding: 8px 15px;
  background-color: rgb(204, 13, 13);
  border-radius: 5px;
  margin-right: 20px;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: white;
}

.save {
  background-color: darkred;
  color: white;
  display: inline;
  border-radius: 5px;
  padding: 5px;
  transition: 3s;
}
.save-div {
  margin-top: 20px;
}
</style>
