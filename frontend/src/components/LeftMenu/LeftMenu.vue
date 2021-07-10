<template>
	<div id="left-menu" class="py-4 d-flex flex-column">
		<div class="d-flex align-center justify-center pb-2">
			<img src="@/assets/logo.png" />
		</div>
		<div class="d-flex align-center justify-center title-modulo py-1">
			<span>Módulo Acadêmico</span>
		</div>
		<ul class="flex-grow-1 pl-2 menu">
			<router-link class="mt-2 menu-option" to="/" exact>Home</router-link>
			<router-link class="mt-2 menu-option" to="/alunos">Alunos</router-link>
		</ul>
		<v-divider></v-divider>
		<div class="px-2 pt-2">
			<v-icon class="mr-2" color="#fff">mdi mdi-exit-run</v-icon>
			<label>Sair</label>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="sass">
#left-menu
	width: 200px
	background-color: #7b88ce
	border-color: #7b88ce
	margin: 10px 0px
	border-bottom-right-radius: 10px
	border-top-right-radius: 10px

#left-menu .title-modulo
	background-color: #283593
	color: #f2f2f2

#left-menu .menu .menu-option
	background: #9fa8da
	padding: 4px 0
	display: flex
	justify-content: space-between
	padding: 5px 10px
	border-top-left-radius: 5px
	border-bottom-left-radius: 5px
	text-decoration: none
	color: #383738

#left-menu .menu .menu-option.router-link-active
	width: calc( 100% + 10px )
	border-top-right-radius: 15px
	border-bottom-right-radius: 15px
	background: #1c286b
	color: #f2f2f2
</style>