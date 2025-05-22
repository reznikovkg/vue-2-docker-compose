<script>
	export default {
		props: ['start', 'end'],
	}
</script>

<template>
	<g><line :x1="start.x" :y1="start.y" :x2="end.x" :y2="end.y" stroke="rgba(255,0,0,1.0)" stroke-dasharray="5,3"/></g>
</template>

<style>

	circle{
		stroke: #AAA;
	}

	circle.enemy-red{
		stroke: red;
		fill: rgba(255, 0, 0, 0.3);
	}

</style>