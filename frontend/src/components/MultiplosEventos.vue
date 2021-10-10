<template>
    <div>
        <button @click="primeiro($event), segundo($event)">Ativar Múltiplos Eventos</button>
        <p>{{ multiplos_eventos }}</p>
    </div>
</template>

<script>
export default {
    name: "MúltiplosEventos",
    data() {
        return {
            multiplos_eventos: ""
        }
    },
    methods: {
        primeiro(e) {
            this.multiplos_eventos = "Primeiro evento ativado!"
        },
        segundo(e) {
            setTimeout(() => this.multiplos_eventos = "Segundo evento!", 1000)
        }
    }
}
</script>

<style scoped>
    div {
        align-items: center;
        width: 100%;
        margin: 40px;
    }
</style>