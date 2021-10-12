<template>
    <div class="container">
        <v-form v-model="valid">
    <v-container>
        <v-row>
        
        <v-col
            cols="12"
            md="6"
        >
            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="6"
        >
        <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :type="show3 ? 'text' : 'password'"
            :counter="10"
            label="Senha"
            required

        ></v-text-field>
        </v-col>

    </v-row>
    </v-container>
</v-form>
    </div>
</template>

<script>
    export default {
        name: 'InputText'
    }
</script>