<template>
    <v-data-table
        :headers="headers"
        :items="Cadastrados"
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
                    New Item
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
                        v-model="editedItem.name"
                        label="Cadastrados"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.nomes"
                        label="Nomes"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.cpf"
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
                    Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
            value: 'name',
            },
            { text: 'Nomes', value: 'nomes' },
            { text: 'CPF (g)', value: 'cpf' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        Cadastrados: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            nomes: 0,
            cpf: 0,
        },
        defaultItem: {
            name: '',
            nomes: 0,
            cpf: 0,
        },
        }),
        computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
            this.Cadastrados = [
            {
                name: 101235,
                nomes: 'Drielison Lopes',
                cpf: 65478912322,
            },
            {
                name: 111687,
                nomes: 'Sarutobi Sensei',
                cpf: 78945612311,
            },
            {
                name: 11365,
                nomes: 'Mitchel Telo',
                cpf: 12345678999,
            },
            {
                name: 101229,
                nomes: 'Mauricío Miranda',
                cpf: 12499999999,
            },
            ]
        },

        editItem (item) {
            this.editedIndex = this.Cadastrados.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.Cadastrados.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.Cadastrados.splice(this.editedIndex, 1)
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
            Object.assign(this.Cadastrados[this.editedIndex], this.editedItem)
            } else {
            this.Cadastrados.push(this.editedItem)
            }
            this.close()
        },
        },
    }
</script>