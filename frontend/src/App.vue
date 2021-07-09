<template>
	<v-app>
		<v-main>
			<div class="d-flex height-100vh">
				<left-menu></left-menu>
				<div class="px-6 flex-grow-1">
					<div class="py-3 d-flex space-between align-center">
						<div>
							<h2>{{$route.meta.label}}</h2>
						</div>
						<v-spacer></v-spacer>
						<div>
							<label class="mr-2 font-weight-medium">GUILHERME</label>
							<v-avatar :size="30">
								<img src="https://avatars.githubusercontent.com/u/42628942?v=4" alt="alt" />
							</v-avatar>
						</div>
					</div>
					<v-divider class></v-divider>
					<router-view class="pt-2 content-main" />
				</div>
			</div>
		</v-main>
	</v-app>
</template>

<script>
import LeftMenu from "./components/LeftMenu/LeftMenu.vue";
export default {
	components: { LeftMenu },
	name: "App",

	data: () => ({
		//
	}),
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Poppins')

html
body
	font-family: 'Poppins', sans-serif
	color: #383738
	height: 100vh
	width: 100vw

h1,h2,h3,h4,h5,h6
	color: #383738

#app
	background-color: #edf2f7
	overflow: hidden
	height: 100vh
	width: 100vw

#app .content-main
	height: calc( 100% - 80px )
	overflow: hidden

.height-100vh
	height: 100vh

.full-height
	height: 100%
</style>