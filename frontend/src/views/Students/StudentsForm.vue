<template>
	<v-card class="page-form d-flex">
		<loading :show="loading"></loading>
		<div class="page-form-container">
			<validation-observer ref="observer" v-slot="{ invalid }">
				<form @submit.prevent="submit" class="full-height d-flex flex-column">
					<div>
						<v-row>
							<v-col md="2">
								<validation-provider v-slot="{ errors }" name="ID_ESTUDANTE">
									<v-text-field
										v-model="form.id_estudante"
										:error-messages="errors"
										label="Matrícula"
										disabled
									></v-text-field>
								</validation-provider>
							</v-col>
							<v-col md="6">
								<validation-provider v-slot="{ errors }" name="Nome" rules="xrequired|max:100">
									<v-text-field
										v-model="form.nome"
										:counter="100"
										:error-messages="errors"
										required
										label="Nome"
									></v-text-field>
								</validation-provider>
							</v-col>
							<v-col md="4">
								<validation-provider v-slot="{ errors }" name="CPF" rules="required">
									<v-text-field
										v-mask="'###.###.###-##'"
										v-model="form.cpf"
										:error-messages="errors"
										label="CPF"
										required
									></v-text-field>
								</validation-provider>
							</v-col>
						</v-row>
						<v-row>
							<v-col md="12">
								<validation-provider v-slot="{ errors }" name="Email" rules="required|email|max:120">
									<v-text-field
										v-model="form.email"
										:counter="120"
										:error-messages="errors"
										label="E-mail"
										required
									></v-text-field>
								</validation-provider>
							</v-col>
						</v-row>
					</div>
					<div class="d-flex justify-center pt-6">
						<v-btn @click="$router.push('/alunos')" class="mr-2" color="error">CANCELAR</v-btn>
						<v-btn type="submit" color="success" :disabled="invalid">SALVAR</v-btn>
					</div>
				</form>
			</validation-observer>
		</div>
	</v-card>
</template>

<script>
import { mask } from "vue-the-mask";
import { showStudent } from "./serviceStudent";

export default {
	directives: { mask },
	data() {
		return {
			action: "insert",
			loading: true,
			form: {
				id_estudante: undefined,
				nome: undefined,
				email: undefined,
				cpf: undefined,
			},
		};
	},
	methods: {
		async submit() {
			try {
				let rs = await this.$validator.validateAll();

				if (rs == false) throw new Error("Preencha todos os campos obrigatórios!");

				let data = { ...this.form };
				data.cpf = data.cpf.replace(/\.|-/g, "");

				this.$emit(this.action, data);
			} catch (error) {
				this.$notify.error(error.message);
			}
		},
		clear() {
			this.form.id_estudante = undefined;
			this.form.nome = undefined;
			this.form.email = undefined;
			this.form.cpf = undefined;
			this.$refs.observer.reset();
		},
	},

	async activated() {
		try {
			this.loading = true;
			this.clear();

			let id_estudante = this.$route.params.id;

			if (id_estudante == undefined) this.action = "insert";
			else {
				this.action = "update";

				let student = await showStudent(id_estudante);

				this.form = { ...this.form, ...student.data[0] };
			}
		} catch (error) {
			this.$notify.error(error.message);
		} finally {
			this.loading = false;
		}
	},

	mounted() {
		console.log("form");
	},
};
</script>

<style lang="sass">
.page-form
	height: calc(100% - 72px)
	width: 100%
	overflow: hidden
	overflow-y: auto
	padding: 10px 30px
	display: flex
	justify-content: center

.page-form .page-form-container
	max-width: 800px !important
</style>