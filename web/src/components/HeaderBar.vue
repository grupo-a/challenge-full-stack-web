<template>
    <header>
        <RouterLink :class="{ active: active === 'consult' }" to="/consult-students">Consultar</RouterLink>
        <RouterLink :class="{ active: active === 'create' }" to="/create-students">Cadastrar</RouterLink>
        <RouterLink @click="logout" to="/">Logout</RouterLink>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    active: string
}>()

function logout() {
    localStorage.clear()
}
</script>

<style>
header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #007bff;
    height: 65px;
    padding-inline-start: 10%;
}

header a {
    color: rgb(255, 255, 255, 0.5);
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 10px;
}

header .active {
    color: rgb(255, 255, 255, 1);
}

header a:hover {
    color: rgb(255, 255, 255, 1);
}
</style>
