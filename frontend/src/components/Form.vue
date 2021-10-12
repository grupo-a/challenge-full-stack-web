<template>
    <div class="container" >
        <form class="text-center" action="" @submit="enviarFormulario($event)">
            <v-card class="container light-blue lighten-5" elevation="3" outlined>
                <InputText/>
                <Submit/>
            </v-card>
        </form>
    </div>
    
</template>

<script>
    import InputText from "./form/InputText.vue"
    import Submit from "./form/Submit.vue"

    export default {
        name: 'Form',
        components: {
            InputText,
            Submit
        },
        data() {
            return {
                name: "Digite seu nome"
            }
        },
        methods: {
            enviarFormulario(e) {
                e.preventDefault()

                const name = this.name;
            }
        }
    }
</script>