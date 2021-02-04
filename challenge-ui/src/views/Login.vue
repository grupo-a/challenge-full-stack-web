<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-row>
            <v-col>
              <v-text-field
                v-model="username"
                label="Usuário"
                type="text"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                class="mr-4"
                type="submit"
              >
                Login
              </v-btn>
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
  </v-form>
</template>

<script>
  import axios from './../http/axios'
  export default {
    data() {
      return {
        username: null,
        password: null,
        alert: {
          show: false,
          type: null,
          message: null
        }
      }
    },
    methods: {
      submit () {
        let data = {
          username: this.username,
          password: this.password
        }
        //Auth user and redirect to sudents list
        axios.post('/users/auth', data).then((response) => {
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
          this.alert.message = 'Login realizado com sucesso'

          //Store token and user in local storage
          const token = response.success.token
          const user = JSON.stringify(response.success.user)

          localStorage.setItem('user', user)
          localStorage.setItem('token', token)

          //Redirect user
          setTimeout(function() {
            window.location.href = '/'
          }, 1000)
        }).catch(err => {
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.message = err
        })
      }
    }
  }
</script>