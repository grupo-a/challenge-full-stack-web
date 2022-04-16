<template>
    <div>
        <p class="panel-heading">Consulta de alunos</p>
        <div class="level">
            <div class="form level-item">
                <div class="field has-addons">
                    <input class="input" type="text" placeholder="Digite sua busca">
                    <button class="button is-info">Pesquisar</button>
                    <button class="btn-add" @click="$emit('createStudent')">Cadastrar Aluno</button>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
export default {
    name: 'SearchStudent',
    emits: ['createStudent']
}

</script>

<style scoped>
.panel-heading {
    border: 2px solid black;
}

.input {
    width: 500px;
}

.form {
    padding: 15px;
    border: 2px solid black;
    height: 150px;
}

.is-info {
    font-weight: bold;
}

.btn-add {
    margin-left: 20px;
}

.level {
    width: 100%;
}
</style>