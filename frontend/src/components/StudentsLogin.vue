<template>
    <v-row class="mt-10" align="center" justify="center">
        <v-card-title justify="center" align="center">Login</v-card-title>
        
        <v-col cols="12" align="center">
            <form height="100%" class="mx-10 mt-10">
                <v-text-field
                    outlined
                    clearable
                    v-model="userName"
                    label="Informe o usuário"
                />

                <v-text-field
                    outlined
                    clearable
                    v-model="password"
                    label="Informe a senha"
                />

                <div class="d-flex flex-row-reverse align-end">
                    <v-btn @click="login" color="primary">Login</v-btn>
                </div>
            </form>
        </v-col>
    </v-row>
</template>

<script>
import router from '@/router'

export default {
    data() {
        return { 
            userName: "",
            password: ""
        };
    },
    methods: {
        async login() {
            try {
                this.$store.dispatch('LOGIN_STUDENT', {
                    userName: this.userName,
                    password: this.password
                });
            } catch (err) {
                console.error(err);
            }

            router.push('/');
        }
    }
}
</script>