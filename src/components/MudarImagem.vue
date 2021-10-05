<template>
    <div>
        <button @click="$emit('mudarImagem')">Trocar imagem do perfil</button>
    </div>
</template>

<script>
export default {
    name: 'MudarImagem',
    emits: ['mudarImagem']
}
</script>
