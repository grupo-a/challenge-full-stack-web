<template>
    <div>
        <p>{{ alunoEmail }}</p>
        <p v-if="esta_logado">Aluno está matriculado em algum curso</p>
        <p v-else>Aluno não matriculado</p>
        <div @click="showDados" class="blue">{{ textButton }} dados do Aluno</div>
        <ul v-show="mostrar_dados">
            <li>Nome</li>
            <li>Email</li>
            <li>RA</li>
            <li>CPF</li>
        </ul>
        <p>Aluno optou utilizar tecnologias para back-end:</p>
        <ul>
            <li v-for="(technology, index) in backend_technologies" v-bind:key="index">
                {{ technology }}
            </li>
        </ul>
        <p>Aluno optou utilizar tecnologias para front-end:</p>
        <ul>
            <li v-for="(technology) in frontend_technologies" v-bind:key="technology.id">
                {{ technology.language }}
            </li>
        </ul>
    <Picture />
    </div>
</template>

<script lang="ts">
    import Picture from './Picture.vue'

    export default {
        name: 'Info',
        components: {
            Picture
        },
        props: {
            alunoEmail: String
        },
        data() {
            return {
                esta_logado: true,
                mostrar_dados: false,
                textButton: "Mostrar ",
                backend_technologies: ['JavaScript', 'PHP', 'Python', 'NodeJS'],
                frontend_technologies: [
                    {id: 1, language: 'HTML'},
                    {id: 2, language: 'CSS'},
                    {id: 3, language: 'Vue'}
                ]
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
