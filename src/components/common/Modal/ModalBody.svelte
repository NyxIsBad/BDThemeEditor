<script lang="ts">
	/** Adds the markdown class. */
	export let markdown: boolean = true;
</script>

<template>
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
</style>