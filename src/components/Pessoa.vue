<template>
    <div>
        <h2>Essa é a descrição da pessoa: {{ nome }}</h2>
        <Info :alunoEmail="alunoEmail"/>
    </div>
</template>

<script>
    import Info from './Info.vue';

    export default {
        name: 'Pessoa',
        components: {
            Info
        },
        data() {
            return {
                nome: 'Raul',
                alunoEmail: 'raul@paleti.com'
            }
        }
    }
</script>