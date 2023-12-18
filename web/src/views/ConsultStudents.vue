<template>
    <header>
        <RouterLink to="/create-students">Cadastrar</RouterLink>
        <RouterLink class="active" to="/consult-students">Consultar</RouterLink>
    </header>

    <div id="page-consult-payments">
        <div class="content">
            <h1>Consulta de alunos cadastrados</h1>

            <table>
                <thead>
                    <tr>
                        <th>Registro Acadêmico</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="student in students" :key="student.id">
                        <td>{{ student.ra }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.cpf }}</td>
                        <td>{{ student.email }}</td>
                        <td>
                            <RouterLink :to="'/change-payments/' + student.id">
                                <button class="buttonEdit" title="Editar">Editar</button>
                            </RouterLink>
                            <button
                                class="buttonRemove"
                                title="Excluir"
                                @click="handleRemovePayment(student.id, student.name)"
                            >
                                Deletar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const students = [
    {
        id: '1',
        name: 'Joao',
        email: 'joao@test.com',
        ra: '111111111',
        cpf: '111.111.111-11',
    },
    {
        id: '2',
        name: 'Maria',
        email: 'maria@test.com',
        ra: '222222222',
        cpf: '222.222.222-22',
    },
    {
        id: '3',
        name: 'José',
        email: 'jose@test.com',
        ra: '333333333',
        cpf: '333.333.333-33',
    },
]

function handleRemovePayment(_id: string, name: string) {
    // await api.delete(`payments/${id}`).then(
    //     (res) => {
    if (confirm(`Realmente deseja deletar o estudante ${name}?`) == true) {
        alert('Aluno deletado')
    } else {
        alert('Aluno não deletado')
    }
    // },
    // (res) => {
    //     console.log(res)
    //     alert('Houve um erro ao remover o pagamento.')
    // }
    // )
    // history.go(0)
}
</script>

<style scoped>
#page-consult-payments {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

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

#page-consult-payments .content {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

#page-consult-payments h1 {
    font-size: 36px;
}

#page-consult-payments .content table {
    margin-top: 64px;
    min-inline-size: auto;
    border-collapse: collapse;
}

#page-consult-payments th,
#page-consult-payments td {
    border-bottom: 1px solid #bbb;
    text-align: left;
    padding: 8px 8px;
}

#page-consult-payments .content table tbody tr td button.buttonEdit {
    width: 60px;
    height: 37px;
    background: #007bff;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    transition: background-color 0.2s;
    cursor: pointer;
    margin: 0 5px;
}

#page-consult-payments table tbody tr td button:hover.buttonEdit {
    background: #0069d9;
}

#page-consult-payments table tbody tr td button.buttonRemove {
    width: 60px;
    height: 37px;
    background: #dc3545;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    transition: background-color 0.2s;
    cursor: pointer;
    margin: 0 5px;
}

#page-consult-payments table tbody tr td button:hover.buttonRemove {
    background: #bd2130;
}
</style>
