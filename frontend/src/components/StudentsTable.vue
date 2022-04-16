<template>
    <div class="table-container">
        <table class="table is-striped">
            <thead>
                <th>Registro Acadêmico</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Ações</th>
            </thead>
        <tbody>
            <tr v-for="student in students" :key="student.ra">
                <th>{{ student.ra }}</th>
                <th>{{ student.name }}</th>
                <th>{{ student.cpf }}</th>
                <th>
                    <a href="#">[Editar]</a>
                    <a href="#">[Excluir]</a>
                </th>
            </tr>
        </tbody>
        </table>
    </div>

</template>

<script>
export default {
    name: 'StudentsTable',
    data() {
        return {
            students: [
                {
                    'ra': 1,
                    'name': 'Bruno',
                    'cpf': '12345678912'
                },
                {
                    'ra': 2,
                    'name': 'Bruno',
                    'cpf': '12345678912'
                },
                {
                    'ra': 3,
                    'name': 'Bruno',
                    'cpf': '12345678912'
                },
                {
                    'ra': 4,
                    'name': 'Bruno',
                    'cpf': '12345678912'
                }
            ]
        }
    }
}

</script>

<style scoped>
.table-container {
    border: 2px solid black;

}

.table {
    width: 100%
}

</style>