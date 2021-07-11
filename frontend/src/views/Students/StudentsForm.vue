<template>
	<v-card class="page-form">
		<validation-observer ref="observer" v-slot="{ invalid }">
			<form @submit.prevent="submit">
				<validation-provider v-slot="{ errors }" name="Name" rules="required|max:10">
					<v-text-field v-model="name" :counter="10" :error-messages="errors" label="Name" required></v-text-field>
				</validation-provider>
				<validation-provider v-slot="{ errors }" name="email" rules="required|email">
					<v-text-field v-model="email" :error-messages="errors" label="E-mail" required></v-text-field>
				</validation-provider>
				<v-btn class="mr-4" type="submit" :disabled="invalid">submit</v-btn>
				<v-btn @click="clear">clear</v-btn>
			</form>
		</validation-observer>
	</v-card>
</template>

<script>
export default {
	data: () => ({
		name: "",
		phoneNumber: "",
		email: "",
		select: null,
		items: ["Item 1", "Item 2", "Item 3", "Item 4"],
		checkbox: null,
	}),

	methods: {
		submit() {
			this.$refs.observer.validate();
		},
		clear() {
			this.name = "";
			this.phoneNumber = "";
			this.email = "";
			this.select = null;
			this.checkbox = null;
			this.$refs.observer.reset();
		},
	},

	mounted() {
		console.log("form");
	},
};
</script>

<style lang="sass">
.page-form
	height: calc(100% - 72px)
	overflow: hidden
	overflow-y: auto
	padding: 10px
</style>