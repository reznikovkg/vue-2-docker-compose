<template>
	<g>
		<circle class="enemy-red" :cx="en.x" :cy="en.y" :r="9"></circle>
	</g>
</template>

<style>

	circle{
		stroke: #AAA;
	}

	circle.enemy-red{
		stroke: red;
		fill: rgba(255, 0, 0, 0.3);
	}

	circle.enemy-green{
		stroke: green;
		fill: transparent;
		opacity: 0.5;
	}

</style>

<script>
	export default {
		props: ['en'],
		data: function (){
			return {
				rad: 35, // уже не нужно, удалить
			}
		},
	}
</script>