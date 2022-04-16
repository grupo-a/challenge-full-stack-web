<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }} de Estudante</p>
                <button @click="closeForm" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="studentRa" class="label">Registro Acadêmico</label>
                    <input v-model="studentRa" type="text" class="input" id="studentRa"
                        placeholder="Registro acadêmico gerado automaticamente pelo servidor" />
                </div>
                <div class="field">
                    <label for="studentName" class="label">Nome</label>
                    <input v-model="studentName" type="text" class="input" id="studentName"
                        placeholder="Informe o nome completo" />
                </div>
                <div class="field">
                    <label for="studentEmail" class="label">E-mail</label>
                    <input v-model="studentEmail" type="text" class="input" id="studentEmail"
                        placeholder="Informe apenas um e-mail" />
                </div>
                <div class="field">
                    <label for="studentCpf" class="label">CPF</label>
                    <input v-model="studentCpf" type="text" class="input" id="studentCpf"
                        placeholder="Informe o número do documento" />
                </div>
            </section>
            <footer class="modal-card-foot">
                <input type="submit" @click="saveForm" class="button is-success" value="Salvar">
                <button @click="closeForm" class="button">Cancelar</button>
            </footer>
        </div>

    </div>

</template>

<script>

const axios = require('axios')

export default {
    name: 'StudentForm',
    emits: ['closeForm'],
    props: ['formMode'],
    data() {
        return {
            title: ''
        }
    },
    methods: {
        closeForm() {
            this.$emit('closeForm')
        },
        async saveForm() {
            if (this.formMode === 'Create') {
                const dataFromForm = {
                    'name': this.studentName,
                    'email': this.studentEmail,
                    'cpf': this.studentCpf
                }
                const dataToSave = await JSON.stringify(dataFromForm)
                await this.createStudent(dataToSave)
                console.log(dataToSave)
            }
        },
        async createStudent(dataToSave) {
            await axios.post('http://localhost:3000/students', dataToSave,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => console.log(res))
                .catch(error => {
                    console.log(error.response.data.message)
                    console.log(error.response.status)

                })
        }
    },

    mounted() {
        if (this.formMode === 'Create') {
            this.title = 'Cadastro'
        } else {
            this.title = 'Alteração'
        }
    }
}

</script>


<style scoped>
</style>