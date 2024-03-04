<template>
    <v-dialog v-model="modalActive" fullscreen hide-overlay persistent no-click-animation
        transition="dialog-bottom-transition">

        <v-card tile>

            <v-toolbar dark color="primary">

                <v-toolbar-title>{{ title }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="closeModal"> <v-icon>mdi-close</v-icon> </v-btn>

            </v-toolbar>

            <Validation-observer ref="observador" v-slot="{ invalid }">

                <v-form>

                    <v-card-text>

                        <v-container class="fill-height" fluid>

                            <v-row>

                                <v-col md="3">

                                    <Validation-provider v-slot="{ errors }" name="Tipo de Usuário" vid="userType"
                                        rules="required">

                                        <v-autocomplete v-model="idUserType" item-text="description" item-value="idUserType"
                                            hide-no-data no-data-text="Sem dados para exibir" :items="typeUser"
                                            :error-messages="errors" :disabled="operation === 2 || operation === 1"
                                            outlined>

                                            <template v-slot:label> <span class="red--text"> <strong>* </strong> </span>Tipo
                                                de Usuário</template></v-autocomplete>

                                    </Validation-provider>

                                </v-col>

                                <v-col v-if="idUserType == 2" md="4">

                                    <Validation-provider v-slot="{ errors }" name="Instituição de Ensino"
                                        vid="tipoEquipamento" rules="required">

                                        <v-autocomplete v-model="idEducationalInstitution" item-text="description"
                                            item-value="idEducationalInstitution" hide-no-data
                                            no-data-text="Sem dados para exibir" :items="educationalInstitution"
                                            :error-messages="errors" :disabled="operation === 2 || operation === 1"
                                            outlined>

                                            <template v-slot:label> <span class="red--text"> <strong>* </strong>
                                                </span>Instituição de Ensino </template></v-autocomplete>

                                    </Validation-provider>

                                </v-col>

                                <v-col v-if="idUserType == 2" md="3">

                                    <Validation-provider v-slot="{ errors }" name="RA" vid="ra" rules="max:20">

                                        <v-text-field v-model="ra" label="RA" type="text" outlined counter="20"
                                            maxlength="20" :error-messages="errors"
                                            :disabled="operation === 2 || operation === 1" />

                                    </Validation-provider>

                                </v-col>

                                <v-col md="2">

                                    <Validation-provider v-slot="{ errors }" name="CPF" vid="cpf" :rules="validateCPF">

                                        <v-text-field v-model="cpf" label="CPF" type="text" outlined counter="11"
                                            maxlength="11" :error-messages="errors"
                                            :disabled="operation === 2 || operation === 1" />

                                    </Validation-provider>

                                </v-col>

                            </v-row>

                            <v-row>

                                <v-col md="5">

                                    <Validation-provider v-slot="{ errors }" name="Nome" vid="name" rules="max:500">

                                        <v-text-field v-model="name" label="Nome" type="text" outlined counter="500"
                                            maxlength="500" :error-messages="errors" :disabled="operation === 2" />

                                    </Validation-provider>

                                </v-col>


                                <v-col md="5">

                                    <Validation-provider v-slot="{ errors }" name="E-mail" vid="email"
                                        :rules="validateEmail">

                                        <v-text-field v-model="email" label="E-mail" type="text" outlined counter="244"
                                            maxlength="244" :error-messages="errors" :disabled="operation === 2" />

                                    </Validation-provider>

                                </v-col>

                                <v-col md="2">

                                    <Validation-provider v-slot="{ errors }" name="Telefone" vid="phoneNumber"
                                        :rules="validatePhoneNumber">

                                        <v-text-field v-model="phoneNumber" label="Telefone" type="text" outlined
                                            counter="11" maxlength="11" :error-messages="errors"
                                            :disabled="operation === 2" />

                                    </Validation-provider>

                                </v-col>

                            </v-row>

                            <v-row>

                                <v-col md="4">

                                    <v-checkbox v-model="active" label="Ativo" :disabled="operation === 2" />

                                </v-col>

                            </v-row>

                            <v-row>

                                <v-col md="12" class="text-right">

                                    <v-btn class="primary" @click="confirmOperation" :disabled="invalid">Confirmar</v-btn>
                                    <v-btn color="primary" @click="closeModal" outlined>Cancelar</v-btn>

                                </v-col>

                            </v-row>

                        </v-container>

                    </v-card-text>

                </v-form>

            </Validation-observer>

            <v-overlay :value="overlay" absolute>
                <v-progress-circular color="primary" indeterminate size="100" />
            </v-overlay>

        </v-card>

    </v-dialog>
</template>
<script>

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    data: () => ({
        modalActive: false,
        idUserType: null,
        idEducationalInstitution: null,
        ra: "",
        name: "",
        email: "",
        phoneNumber: "",
        cpf: "",
        active: false,
        overlay: false
    }),
    computed: {
        validateEmail() {
            return {
                required: true,
                max: 244,
                validEmail: { email: this.email }

            }

        },
        validateCPF() {
            return {
                required: true,
                max: 11,
                validCPF: { cpf: this.cpf }

            }
        },
        validatePhoneNumber() {
            return {
                required: true,
                max: 11,
                validPhoneNumber: { phoneNumber: this.phoneNumber }

            }
        },
    },
    props: {
        operation: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        typeUser: {
            type: Array,
            required: true
        },
        educationalInstitution: {
            type: Array,
            required: true
        },
        functionWhenConfirmingOperation: {
            type: Function,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        loading(value) {

            this.overlay = value;

        }
    },
    methods: {
        openModal() {

            this.modalActive = true;

        },
        closeModal() {

            this.modalActive = false;
            this.idUserType = null;
            this.idEducationalInstitution = null;
            this.ra = "";
            this.name = "";
            this.email = "";
            this.phoneNumber = "";
            this.cpf = "";
            this.active = false;
            this.overlay = false;
            this.$refs.observador.reset();

        },
        confirmOperation() {

            const obj = {
                idUserType: parseInt(this.idUserType),
                idEducationalInstitution: parseInt(this.idEducationalInstitution),
                ra: parseInt(this.ra),
                name: this.name,
                email: this.email,
                phoneNumber: this.phoneNumber,
                cpf: this.cpf,
                active: this.active
            };

            this.functionWhenConfirmingOperation(obj);

        },

    }

};

</script>

<style scoped></style>
