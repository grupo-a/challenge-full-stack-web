<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img
                    :src="'https://www.grupoa.com.br/hs-fs/hubfs/+a-22-22%20(1)-1.png?width=150&name=+a-22-22%20(1)-1.png'"
                    class="my-2"
                    contain
                    height="60"
                />
            </v-col>

            <v-col cols="12">
                <h1 class="display-2 font-weight-bold mb-1">
                    Consulta de Alunos
                </h1>
            </v-col>

            <v-col>
                <ExibirAlunos />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import ExibirAlunos from './ExibirAlunos.vue'

export default {
    name: 'Consultar',
    components: {
        ExibirAlunos
    }
}
</script>