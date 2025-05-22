<script>
	export default {

	}
</script>

<template>
	<div id="app">
		<div>
			<nav>
			  <router-link to="/">Intro</router-link>
			  <router-link to="/game/1">Level 1</router-link>
			  <router-link to="/game/2">Level 2</router-link>
			  <router-link to="/game/3">Level 3</router-link>
			</nav>
		</div>
		<router-view />

	</div>
</template>

<style>

	nav {
	  width: 100%;
	  font-size: 12px;
	  text-align: center;
	  background-color: black;
	  padding: 5px;
	}

	nav a.router-link-exact-active {
	  color: var(--color-text);
	}

	nav a.router-link-exact-active:hover {
	  background-color: transparent;
	}

	nav a {
	  display: inline-block;
	  padding: 0 1rem;
	  border-left: 1px solid var(--color-border);
	}

	nav a:first-of-type {
	  border: 0;
	} 
</style>