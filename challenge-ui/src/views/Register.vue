<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-row class="text-right">
          <v-col>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nome"
                hint="Informe o nome completo"
                persistent-hint
                filled
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                hint="Informe um email válido"
                persistent-hint
                filled
                required
              ></v-text-field>

              <v-text-field
                v-model="ra"
                :rules="raRules"
                label="RA"
                hint="Informe o registro acadêmico"
                persistent-hint
                filled
                required
                :disabled="id !== null"
              ></v-text-field>

              <v-text-field
                v-model="cpf"
                :rules="cpfRules"
                label="CPF"
                hint="Insira o número do documento sem pontos ou traços"
                persistent-hint
                filled
                required
                :disabled="id !== null"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                 {{ id ? 'Salvar' : 'Enviar' }}
              </v-btn>

              <v-btn
                color="error"
                class="mr-4"
                @click="$router.push('/')"
              >
                Cancelar
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-alert v-if="alert.show"
              v-html="alert.message"
              outlined
              text
              :type="alert.type"
            ></v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from './../http/axios'
  export default {
    data() {
      return {
        id: null,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'O nome é obrigatório',
          v => (v && this.verifyCompleteName(v)) || 'Informe seu nome completo',
        ],
        email: '',
        emailRules: [
          v => !!v || 'O email é obrigatório',
          v => /.+@.+\..+/.test(v) || 'O email não é válido',
        ],
        ra: '',
        raRules: [
          v => !!v || 'O RA é obrigatório',
          v => (v && v.length <= 10) || 'O RA por padrão tem 10 caracteres no máximo',
          v => (/^\d+$/.test(v)) || 'O RA deve conter somente números'
        ],
        cpf: '',
        cpfRules: [
          v => !!v || 'O CPF é obrigatório',
          v => v && this.verifyCpf(v) || 'O CPF é inválido'
        ],
        alert: {
          show: false,
          type: null,
          message: null
        },
        student: {}
      }
    },
    //Get student if id was provided
    beforeMount() {
      if (this.$route.params.id !== undefined) {
        this.id = this.$route.params.id
        axios.get('/students/'+this.id).then((response) => {
          let student = response.data

          if (student.notfound !== undefined) {
            this.alert.show = true
            this.alert.type = 'error'
            this.alert.message = student.notfound

            return
          }

          this.name = student.name
          this.email = student.email
          this.ra = student.ra
          this.cpf = student.cpf
        })
      }
    },
    methods: {
      //Trigger validation
      validate() {
        if (this.$refs.form.validate()) {
          this.register()
        }
      },
      // Function for fullname validation
      verifyCompleteName(name) {
        let nameCount = []
        let pieces = name.split(' ')
        if (pieces.length > 1) {
          pieces.forEach(value => {
            if (value.trim() !== "") {
              nameCount.push(value)
            }
          })
        } else {
          return false
        }
        return nameCount.length > 1
      },
      //CPF validation
      verifyCpf(val) {
        let cpf = val ? val.replace(/[^\d]+/g, '') : '';
        let numeros, digitos, soma, i, resultado, digitosIguais;
        digitosIguais = 1;
        if (cpf.length < 11) return false;
        for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitosIguais = 0;
            break;
          }
        if (!digitosIguais) {
          numeros = cpf.substring(0, 9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
          if (resultado != digitos.charAt(0)) return false;
          numeros = cpf.substring(0, 10);
          soma = 0;
          for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
          if (resultado != digitos.charAt(1)) return false;
          return true;
        } else return false;
      },
      //Submit data
      register() {
        let endpoint = '/students/create'
        let payload = {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf
        }

        //If ID exists, pass to payload and call edit endpoint
        if (this.id) {
          payload['id'] = this.id
          endpoint = '/students/edit'
        }

        axios.post(endpoint, payload).then((response) => {
          response = response.data
          if (response.error !== undefined) {
            //Show error alert
            this.alert.show = true
            this.alert.type = 'error'

            //Handle error messages
            let errors = ''
            if (Array.isArray(response.error)) {
              for (var i = 0; i < response.error.length; i++) {
                errors += response.error[i].msg+'</br>'
              }
            } else {
              errors = response.error
            }

            this.alert.message = errors

            return
          }

          //shows alert
          this.alert.show = true
          this.alert.type = 'success'
          this.alert.message = response.success.message

          //Redirect to the same page
          const insertId = response.success.id

          /* If the user is being registered, redirect to the same page with 
          created Id, otherwise only hide the successfull edit message */
          if (!this.id) {
            setTimeout(() => {
              this.$router.push('/cadastro/' + insertId)
              this.id = insertId
              this.alert.show = false
            }, 1000)
          } else {
            setTimeout(() => {
              this.alert.show = false
            }, 4000)
          }

        }).catch((err) => {
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.message = err
        })
      }
    }
  }
</script>