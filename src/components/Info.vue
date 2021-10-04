<template>
    <div>
        <p v-if="esta_logado">Aluno está matriculado em algum curso</p>
        <p v-else>Aluno não matriculado</p>
        <div @click="showDados" class="blue">{{ textButton }} dados do Aluno</div>
        <ul v-show="mostrar_dados">
            <li>Nome</li>
            <li>Email</li>
            <li>RA</li>
            <li>CPF</li>
        </ul>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Info', 
        data() {
            return {
                esta_logado: true,
                mostrar_dados: false,
                textButton: "Mostrar "
            }
        },
        methods: {
            showDados() {
                this.mostrar_dados = !this.mostrar_dados
                if(!this.mostrar_dados) {
                    this.textButton = "Mostrar "
                } else {
                    this.textButton = "Esconder "
                }
            }
        }
    }
</script>