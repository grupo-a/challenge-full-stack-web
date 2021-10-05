<template>
    <v-footer dark padless>
    <v-card
        flat
        tile
        class="black white--text text-center"
    >
    <v-card-text>
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
        >
        <a href="https://www.facebook.com/GrupoAEducacao/" target="_blank">
            <v-icon size="30px">
                {{ icon }}
            </v-icon>
        </a>
        </v-btn>
    </v-card-text>
        <div class="my-2">
            <v-btn color="#E30513" dark large>
                <a
                    href="https://loja.grupoa.com.br/?utm_source=Institucional&utm_medium=botao&utm_campaign=clique"
                    target="_blank"
                >
                    <p class="pButtonLoja">Loja Virtual</p>
                </a>
            </v-btn>
        </div>
        <v-card-text class="white--text pt-0">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dign.
        </v-card-text>
        <v-card-text class="white--text">
            <strong>sac@grupoa.com.br</strong> — {{ new Date().getFullYear() }}
        </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            icons: [
                'mdi-facebook',
                'mdi-linkedin',
            ],
        }),
    }
</script>

<style scoped>
    .pButtonLoja {
        font-size: 1.5rem;
        margin: 1rem;
        color: #fff;
    }
    a {
        text-decoration: none;
    }
</style>