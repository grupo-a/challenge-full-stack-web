<template>
	<div class="page-list">
		<v-row class="page-list-filter align-end pb-4">
			<v-col md="6">
				<v-text-field label="Pesquisar" hide-details></v-text-field>
			</v-col>
			<v-col md="4"></v-col>
			<v-col md="2">
				<v-btn to="alunos/new" color="info">Novo Registro</v-btn>
			</v-col>
		</v-row>
		<div class="page-list-grid">
			<v-data-table height="100%" :headers="headers" :items="desserts">
				<template v-slot:item.actions="{ item }">
					<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
					<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
				</template>
			</v-data-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{
					text: "Matrícula",
					align: "start",
					value: "id_estudante",
				},
				{ text: "Nome", value: "nome" },
				{ text: "Email", value: "email" },
				{ text: "CPF", value: "cpf" },
				{ text: "Ações", value: "actions", sortable: false },
			],
			desserts: [
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					id_estudante: "1",
					nome: "Guilherme Trindade",
					email: "bsbtrindade@gmail.com",
					cpf: "051.789.181-69",
				},
				{
					name: "Ice cream sandwich",
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					iron: "1%",
				},
			],
		};
	},
	mounted() {
		console.log("listagem");
	},
};
</script>

<style lang="sass">
.page .page-list
	height: 100%

.page .page-list .page-list-grid
	height: calc(100% - 72px)
	overflow: hidden
	overflow-y: auto
</style>
