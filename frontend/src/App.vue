<script setup lang="ts">
    import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
    <v-app>
        <v-main>
            <v-container>
                <div class="d-flex justify-center">
                    <a href="https://vite.dev" target="_blank">
                        <img src="/vite.svg" class="logo" alt="Vite logo" />
                    </a>
                    <a href="https://vuejs.org/" target="_blank">
                        <img
                            src="./assets/vue.svg"
                            class="logo vue"
                            alt="Vue logo"
                        />
                    </a>
                </div>

                <v-card class="mx-auto my-8" elevation="16" max-width="344">
                    <v-card-item>
                        <v-card-title> Card title </v-card-title>
                        <v-card-subtitle>
                            Card subtitle secondary text
                        </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </v-card-text>
                </v-card>

                <HelloWorld msg="Vite + Vue" />
            </v-container>
        </v-main>
    </v-app>
</template>
