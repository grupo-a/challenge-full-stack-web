<template>
	<div class="page-list">
		<v-row class="page-list-filter align-end pb-4">
			<v-col md="6">
				<v-text-field v-model="textSearch" label="Pesquisar" hide-details></v-text-field>
			</v-col>
			<v-col md="4"></v-col>
			<v-col md="2">
				<v-btn @click="clickBtnNew" color="info">Novo Registro</v-btn>
			</v-col>
		</v-row>

		<div class="page-list-grid">
			<v-data-table
				height="100%"
				:sort-by="['nome']"
				:headers="headers"
				:items="students"
				:search="textSearch"
			>
				<template v-slot:item.actions="{ item }">
					<v-icon small class="mr-2" @click="clickBtnEdit(item)">mdi-pencil</v-icon>
					<v-icon small @click="clickBtnDelete(item)">mdi-delete</v-icon>
				</template>
			</v-data-table>
		</div>
	</div>
</template>

<script>
import { confirmar } from "@/utils/util";

export default {
	props: ["students"],
	data() {
		return {
			textSearch: "",
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
		};
	},
	methods: {
		clickBtnNew() {
			this.$router.push("alunos/new");
		},
		clickBtnEdit(item) {
			this.$router.push(`alunos/edit/${item.id_estudante}`);
		},
		async clickBtnDelete(item) {
			await confirmar(`Deseja realmente delete o aluno ${item.nome}?`);

			this.$emit("remove", item.id_estudante);
		},
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
