<template>
  <v-row align="center" justify="center">      
      <v-col cols="12" align="center">
        <form height="100%" class="mx-10 mt-10">
          <v-text-field
            class="d-none"
            outlined
            clearable
            v-model="id"
            label="Registro"
            required
          />

          <v-text-field
            outlined
            clearable
            v-model="name"
            label="Informe o nome completo"
            required
          />

          <v-text-field
            outlined
            clearable
            v-model="email"
            label="Informe apenas um e-mail"
            required
          />
          
          <v-text-field
            outlined
            clearable
            v-model="ra"
            label="Informe o registro acadêmico"
            :disabled="disabledText"
          />

          <v-text-field
            outlined
            clearable
            v-model="cpf"
            label="Informe o número do documento"
            :disabled="disabledText"
          />

          <div class="d-flex flex-row-reverse align-end">
              <v-btn @click="saveStudent" color="success">Salvar</v-btn>
              
              <v-btn
                  md
                  color="primary"
                  class="mr-5"
                  to="/"
              >
                  Cancelar
              </v-btn>
          </div>
        </form>
    </v-col>
  </v-row>
</template>

<script>
import router from '@/router'

export default {
  name: 'StudentsForm',
  data() {
    return {
      name: "",
      email: "",
      ra: "",
      cpf: "",
      disabled: false,
      title: ""
    }
  },
  props: ['id'],
  async mounted() {
    if (this.id) {
      const student = (await this.$store.dispatch('GET_STUDENT', this.id)).data;

      this.name = student?.name || ""
      this.email = student?.email || ""
      this.ra = student?.ra || ""
      this.cpf = student?.cpf || ""
    }
  },
  computed: {
    disabledText() {
      if (this.id) {
        return !this.disabled 
      }
    },
  },
  methods: {
    saveStudent() {
      if (this.id) {
        this.$store.dispatch('UPDATE_STUDENT', {
          id: this.id,
          name: this.name,
          email: this.email, 
          ra: this.ra, 
          cpf: this.cpf
        })
      } else {
        this.$store.dispatch('NEW_STUDENT', {
          name: this.name,
          email: this.email, 
          ra: this.ra, 
          cpf: this.cpf
        })
      }

      router.push('/');
    }
  }
}
</script>