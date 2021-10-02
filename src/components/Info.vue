<template>
    <div>
        <p v-if="esta_logado">Aluno está matriculado em algum curso</p>
        <p v-else>Aluno não matriculado</p>
        <ul v-show="mostra_dados">
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
                mostra_dados: true
            }
        }
    }
</script>