<script lang="ts">
	/** Adds the markdown class. */
	export let markdown: boolean = true;

	export let title: string;
</script>

<template>
	<h3 class="modal-title">{title}</h3>
	<div class="modal-body" class:markdown>
		<slot />
	</div>
</template>

<style lang="scss">
	.modal-body {
		overflow: hidden auto;
		max-height: 65vh;
		padding: 0 24px 24px;
	}
	.modal-title {
		color: var(--text-primary);
		font-family: var(--font-display);
		font-weight: 600;
		padding: 24px;
	}
</style>