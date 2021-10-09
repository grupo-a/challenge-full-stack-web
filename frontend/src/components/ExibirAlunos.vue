<template>
    <v-container>
        <p v-if="esta_logado">{{ alunoEmail }}, sua senha gerencial permite cadastrar e editar dados dos Alunos</p>
        <p v-else>Aluno não matriculado</p>
        <v-row class="my-6" align="center" justify="space-around" >
            <v-btn color="primary" elevation="3">
                <input 
                    href="./Cadastrar"
                    type="submit" 
                    value="Cadastrar Aluno"
                >
            </v-btn>
            <v-btn @click="showDados" color="primary" elevation="3">
                <input type="submit" value="">{{ textButton }}
            </v-btn>
        </v-row>
        <ul class="my-6" v-show="mostrar_dados">
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
            alunoEmail: String
        },
        data() {
            return {
                esta_logado: true,
                mostrar_dados: false,
                textButton: "Exibir lista de Alunos",
            }
        },
        methods: {
            showDados() {
                this.mostrar_dados = !this.mostrar_dados
                if(!this.mostrar_dados) {
                    this.textButton = "Exibir lista de Alunos"
                } else {
                    this.textButton = "Esconder lista de Alunos"
                }
            }
        }
    }
</script>
