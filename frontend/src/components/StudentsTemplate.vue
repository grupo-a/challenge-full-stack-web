<template>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
        <v-card color="grey darken-1">
            <v-card-title class="bold white--text text-center">Módulo Acadêmico</v-card-title>
        </v-card>

        <v-btn color="grey lighten-2" block to="/">Alunos</v-btn>
    
    </v-navigation-drawer>

    <v-app-bar app color="grey lighten-2">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            
            <v-spacer />
    
            <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
</template>

<script lang="ts">
export default {
    name: 'StudentsTemplate',
    data: () => {
        return {
        drawer: null
        }
    },
};
</script>