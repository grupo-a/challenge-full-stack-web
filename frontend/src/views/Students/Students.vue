<template>
	<div class="page">
		<keep-alive>
			<router-view @searchStudents="searchStudents"></router-view>
		</keep-alive>
	</div>
</template>

<script>
export default {
	methods: {
		searchStudents() {
			console.log("kkkkkk");
		},
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
