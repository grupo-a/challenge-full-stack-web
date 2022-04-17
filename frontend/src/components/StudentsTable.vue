<template>
    <div class="table-container">
        <table class="table is-striped">
            <thead>
                <th @click="$emit('changeListOrder', 'ra')"><a>Registro Acadêmico</a></th>
                <th @click="$emit('changeListOrder', 'name')"><a>Nome</a></th>
                <th @click="$emit('changeListOrder', 'email')"><a>Email</a></th>
                <th @click="$emit('changeListOrder', 'cpf')"><a>CPF</a></th>
                <th>Ações</th>
            </thead>
        <tbody>
            <tr v-for="student in studentsList" :key="student.ra">
                <th>{{ student.ra }}</th>
                <th>{{ student.name }}</th>
                <th>{{ student.email }}</th>
                <th>{{ student.cpf }}</th>
                <th>
                    <a @click="$emit('updateStudent', 'Edit', student)">[Editar]</a>
                    <a @click="deleteStudent(student.ra)">[Excluir]</a>
                </th>
            </tr>
        </tbody>
        </table>
    </div>

</template>

<script>

const axios = require ('axios');

export default {
    name: 'StudentsTable',
    props: ['studentsList'],
    methods: {
        async deleteStudent(ra) {
            await axios.delete(`http://localhost:3000/students/${ra}`)
            alert(`Estudante ${ra} deletado`)
            this.$emit('updateStudentsList')
        }
    },
    emits: ['updateStudentsList', 'updateStudent', 'changeListOrder']
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