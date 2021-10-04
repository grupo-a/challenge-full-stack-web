<template>
    <div class="container">
        <div>
            <input type="text" v-model="name" class="">
        </div>
        <div>
            <label for="email">Email </label>
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