<template>
    <v-container>
        <p v-if="logged">{{ studentEmail }}, sua senha gerencial permite cadastrar e editar dados dos Alunos</p>
        <p v-else>Aluno não matriculado</p>
        <v-row class="my-6" align="center" justify="space-around" > 
            <v-btn @click="showDados" color="primary" elevation="3">
                <input type="submit" value="">{{ textButton }}
            </v-btn>
        </v-row>
        <ul class="my-6" v-show="showData">
            <Table />
        </ul>
        <p>Certifique de verificar todos os dados antes de efeturar qualquer alteração</p>
    </v-container>
</template>

<script lang="ts">

import Table from './Table.vue'

    export default {
        name: 'Cadastrar',
        components: {
            Table
        },
        props: {
            studentEmail: String
        },
        data() {
            return {
                logged: true,
                showData: false,
                textButton: "Exibir lista de Alunos",
            }
        },
        methods: {
            showDados() {
                this.showData = !this.showData
                if(!this.showData) {
                    this.textButton = "Exibir lista de Alunos"
                } else {
                    this.textButton = "Esconder lista de Alunos"
                }
            }
        }
    }
</script>
