<template>
    <div class="container">
        <div>
            <label for="name">Nome </label>
            <input class="white" type="text">
        </div>
        <div>
            <label for="email">E-mail </label>
            <input class="white" type="email">
        </div>
        <div>
            <label for="password">Senha </label>
            <input class="white" type="password">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputText'
    }
</script>