<template>
	<v-overlay :value="show" color="#21212178" absolute>
		<v-progress-circular color="primary" indeterminate size="85" style="margin-top: -150px">Aguarde...</v-progress-circular>
	</v-overlay>
</template>

<script>
export default {
	props: ["show"],
	data() {
		return {};
	},
	computed: {},
	methods: {},
};
</script>

<style lang="sass">
// .loading-main
//     position: relative

.v-dialog__content
    position: absolute
</style>