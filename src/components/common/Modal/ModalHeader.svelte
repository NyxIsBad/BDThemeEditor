<template>
	<h3 class="title"><slot /></h3>
</template>

<style lang="scss">
	.title {
		color: var(--text-primary);
		font-family: var(--font-display);
		font-weight: 600;
		padding: 24px;
	}
</style>