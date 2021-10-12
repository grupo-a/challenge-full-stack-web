<template>
    <v-data-table
        :headers="headers"
        :items="Registered"
        sort-by="nomes"
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar
            flat
        >
            <v-toolbar-title>Alunos Cadastrados</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                    Cadastrar Aluno
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.nomes"
                        label="Nome"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.ra"
                        type="number"
                        label="RA"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.cpf"
                        type="number"
                        label="CPF"
                        ></v-text-field>
                    </v-col>
                    
                    </v-row>
                </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                    Salvar
                    <!-- <v-alert dense dismissible type="success">Aluno Cadastrado</v-alert> -->
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Você tem certeza que deseja excluir esse Aluno?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
            mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
            mdi-delete
        </v-icon>
        </template>
        <template v-slot:no-data>
        <v-btn
            color="primary"
            @click="initialize"
        >
            Reset
        </v-btn>
        </template>
    </v-data-table>
    </template>

    <script>
    export default {
        data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
            text: 'Registro Acadêmico',
            align: 'start',
            sortable: false,
            value: 'ra',
            },
            { text: 'Nomes', value: 'nomes' },
            { text: 'CPF', value: 'cpf' },
            { text: 'Ações', value: 'actions', sortable: false },
        ],
        Registered: [],
        editedIndex: -1,
        editedItem: {
            nomes: '',
            email: '',
        },
        defaultItem: {
            ra: '',
            nomes: '',
            cpf: '',
            email: '',
        },
        }),
        computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Novo Aluno' : 'Editar Aluno'
        },
        },
        watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
        },
        created () {
        this.initialize()
        },
        methods: {
        initialize () {
            this.Registered = [
            {
                ra: 101235,
                nomes: 'Drielison Lopes',
                cpf: 65478912322,
            },
            {
                ra: 111687,
                nomes: 'Sarutobi Sensei',
                cpf: 78945612311,
            },
            {
                ra: 11365,
                nomes: 'Mitchel Telo',
                cpf: 12345678999,
            },
            {
                ra: 101229,
                nomes: 'Mauricío Miranda',
                cpf: 12499999999,
            },
            ]
        },

        editItem (item) {
            this.editedIndex = this.Registered.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.Registered.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.Registered.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.Registered[this.editedIndex], this.editedItem)
            } else {
            this.Registered.push(this.editedItem)
            }
            this.close()
        },
        },
    }
</script>