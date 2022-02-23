<script lang="ts">
	export let title: string;
</script>

<template>
	<header class="container">
		<h1 class="title">{title}</h1>
	</header>
</template>

<style lang="scss">
	.container {
		padding: 80px 0;
	}
	.title {
		font-size: 48px;
		color: var(--text-primary);
		font-family: var(--font-display);
	}
</style>