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
                        :placeholder="student?.ra || 'Registro acadêmico gerado automaticamente pelo servidor'" disabled="" />
                </div>
                <div class="field">
                    <label for="studentName" class="label">Nome</label>
                    <input v-model="studentName" type="text" class="input" id="studentName"
                        :placeholder="student?.name || 'Informe o nome completo'" />
                </div>
                <div class="field">
                    <label for="student-email" class="label">E-mail</label>
                    <input v-model="studentEmail" type="text" class="input" id="studentEmail"
                        :placeholder="student?.email || 'Informe apenas um e-mail'" />
                </div>
                <div class="field">
                    <label for="studentCpf" class="label">CPF</label>
                    <input v-model="studentCpf" type="text" class="input" id="studentCpf"
                        placeholder="Informe o número do documento">
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
    props: {
        formMode: String,
        student: Object
    },
    data() {
        return {
            title: '',
            studentRa: '',
            studentEmail: '',
            studentCpf: '',
            studentName: ''
        }
    },
    methods: {
        closeForm() {
            this.$emit('closeForm')
        },
        async saveForm() {
            const dataFromForm = {
                    'name': this.studentName,
                    'email': this.studentEmail,
                    'cpf': this.studentCpf
                }
                const dataToSave = await JSON.stringify(dataFromForm)
            if (this.formMode === 'Create') {
                await this.createStudent(dataToSave)
            } else if(this.formMode === 'Edit') {
                await this.updateStudent(dataToSave, this.studentRa)
            }
            
        },
        async createStudent(dataToSave) {
            await axios.post('http://localhost:3000/students', dataToSave,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => console.log(res))
                .catch(error => {
                    alert(error.response.data.message)
                    console.log(error.response.data.message)
                    console.log(error.response.status)
                })
        },
        async updateStudent(dataToSave, ra) {
            await axios.put(`http://localhost:3000/students/${ra}`, dataToSave,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    if(res.status === 200) {
                        alert(`Estudante ${ra} atualizado`)
                        this.closeForm()
                    }
                })
                .catch(error => {
                    alert(error.response.data.message)
                    console.log(error.response.data.message)
                    console.log(error.response.status)
                })
        },
        getStudentInfo(student) {
            this.studentRa = student.ra
            this.studentName = student.name
            this.studentEmail = student.email
            this.studentCpf = student.cpf
        }
    },

    mounted() {
        if (this.formMode === 'Create') {
            this.title = 'Cadastro'
        } else {
            this.title = 'Alteração'
            this.getStudentInfo(this.student)
        }
    }
}

</script>


<style scoped>
</style>