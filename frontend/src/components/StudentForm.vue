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
                    <input type="text" class="input" id="studentRa" placeholder="Registro acadêmico gerado automaticamente pelo servidor"/>
                </div>
                <div class="field">
                    <label for="studentName" class="label">Nome</label>
                    <input type="text" class="input" id="studentName" placeholder="Informe o nome completo"/>
                </div>
                <div class="field">
                    <label for="studentEmail" class="label">E-mail</label>
                    <input type="text" class="input" id="studentEmail" placeholder="Informe apenas um e-mail"/>
                </div>
                <div class="field">
                    <label for="studentCpf" class="label">CPF</label>
                    <input type="text" class="input" id="studentCpf" placeholder="Informe o número do documento"/>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Salvar</button>
                <button @click="closeForm" class="button">Cancelar</button>
            </footer>
        </div>
        
    </div>

</template>

<script>
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
        saveForm() {
            console.log('Saving form')
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