<template>
    <div>
        <img :src="avatar" :alt="descricao">
        <MudarImagem @mudarImagem="trocarImagem" />
    </div>
</template>

<script>
    import MudarImagem from './MudarImagem.vue'

    export default {
        name: 'Picture',
        components: { 
            MudarImagem 
        },
        data() {
            return { 
                avatar: "./img/avatar.png",
                descricao: "Raul Paleti"
            }
        },
        methods: {
            trocarImagem() {
                console.log("Opa")
            this.avatar = "./img/avatar2.png"
        }
    }
}
</script>