<template>
	<div class="page">
		<loading :show="loading"></loading>
		<keep-alive exclude="StudentsForm">
			<router-view
				:students="students"
				@insert="insert"
				@update="update"
				@remove="remove"
				@search="search"
				@showLoading="showLoading"
			></router-view>
		</keep-alive>
	</div>
</template>

<script>
import { indexStudents, storeStudent, updateStudent, destroyStudent } from "./serviceStudent";

export default {
	data() {
		return {
			loading: false,
			students: [],
		};
	},
	methods: {
		showLoading(value) {
			this.loading = value;
		},
		async insert(data) {
			try {
				this.loading = true;

				let rs = await storeStudent(data);

				data = { ...data, id_estudante: rs.data.insertId };

				this.students.push(data);

				this.$router.push("/alunos");
			} catch (error) {
				this.$notify.error(error.message);
			} finally {
				this.loading = false;
			}
		},
		async update(data) {
			try {
				this.loading = true;

				await updateStudent(data);

				let index = this.students.findIndex((student) => student.id_estudante == data.id_estudante);

				this.students.splice(index, 1);
				this.students.push({ ...data });

				this.$router.push("/alunos");
			} catch (error) {
				this.$notify.error(error.message);
			} finally {
				this.loading = false;
			}
		},
		async remove(id) {
			try {
				this.loading = true;

				await destroyStudent(id);

				let index = this.students.findIndex((student) => student.id_estudante == id);

				this.students.splice(index, 1);

				this.$notify.success("Aluno deletado com sucesso!");
			} catch (error) {
				this.$notify.error(error.message);
			} finally {
				this.loading = false;
			}
		},
		async search() {
			try {
				this.loading = true;

				let rs = await indexStudents();

				this.students = rs.data;
			} catch (error) {
				this.$notify.error(error.message);
			} finally {
				this.loading = false;
			}
		},
	},
	activated() {
		if (this.students.length == 0) this.search();
	},
	mounted() {
		if (this.$route.name == "StudentList") this.search();
	},
};
</script>

<style lang="sass">
.page
	height: 100%
	overflow: hidden

.page .page-list, .page .page-form
	height: 100%

.page .page-list .page-list-grid
	height: calc(100% - 72px)
	overflow: hidden
	overflow-y: auto
</style>
