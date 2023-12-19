<template>
    <div>
        <HeaderBar active="consult" />

        <div id="page-consult-students">
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
                                <div class="buttonsContainer">
                                    <RouterLink :to="'/change-students/' + student.id">
                                        <button class="buttonEdit" title="Editar">
                                            <span class="mdi mdi-square-edit-outline"></span>
                                        </button>
                                    </RouterLink>
                                    <button
                                        class="buttonRemove"
                                        title="Excluir"
                                        @click="() => handleRemoveStudent(student.id, student.name)"
                                    >
                                        <span class="mdi mdi-delete"></span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { httpApi } from '@/services/api'
import type { IStudent } from '@/types/Student'
import { onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'
import { AxiosError } from 'axios'

const api = httpApi()
const students = reactive<IStudent[]>([])

onMounted(async () => {
    try {
        const response = await api.get(`students`)

        console.log('response', response)

        students.push(...response.data)
    } catch (error) {
        console.error(error)

        if (error instanceof AxiosError)
            alert(`Erro ao tentar visualizar a lista de alunos:\n\n${JSON.stringify(error.response?.data)}`)
        else alert(`Erro inesperado ao tentar visualizar a lista de alunos`)
    }
})

async function handleRemoveStudent(id: string, name: string) {
    try {
        if (confirm(`Realmente deseja remover o aluno ${name}?`) == true) {
            await api.delete(`students/${id}`)
            alert('Aluno removido com sucesso')

            history.go(0)
        }
    } catch (error) {
        console.error(error)

        if (error instanceof AxiosError) alert(`Erro ao remover o aluno:\n\n${JSON.stringify(error.response?.data)}`)
        else alert(`Erro inesperado ao remover o aluno`)
    }
}
</script>

<style scoped>
#page-consult-students {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

#page-consult-students .content {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

#page-consult-students h1 {
    font-size: 36px;
}

#page-consult-students .content table {
    margin-top: 64px;
    min-inline-size: auto;
    border-collapse: collapse;
}

#page-consult-students th,
#page-consult-students td {
    border-bottom: 1px solid #bbb;
    text-align: left;
    padding: 8px 8px;
}

#page-consult-students .content table tbody tr td div.buttonsContainer {
    display: flex;
    gap: 4px;
}

#page-consult-students .content table tbody tr td button.buttonEdit {
    width: 50px;
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

#page-consult-students table tbody tr td button:hover.buttonEdit {
    background: #0069d9;
}

#page-consult-students table tbody tr td button.buttonRemove {
    width: 50px;
    height: 37px;
    background: #dc3545;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    transition: background-color 0.2s;
    cursor: pointer;
}

#page-consult-students table tbody tr td button:hover.buttonRemove {
    background: #bd2130;
}

#page-consult-students table tbody tr td button span::before {
    font-size: 20px;
}
</style>
