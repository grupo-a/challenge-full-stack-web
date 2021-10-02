<template>
    <v-row class="text-center">
        <v-col class="mb-4">
            <h1>Meu nome é: {{ nome }}</h1>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'LifeCycle',
    data() {
        return {
            nome: 'neverstoplearning'
        }
    },
}
</script>