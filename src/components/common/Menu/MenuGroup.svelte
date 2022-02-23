<script lang="ts">
	/**
	 * Displays a title for the group.  
	 * Default = `undefined`.
	 */
	export let title: string | undefined = undefined;
</script>

<template>
	<div role="group" class="group">
		{#if title}
			<h4 class="title">
				{title}
			</h4>
		{/if}
		<slot />
	</div>
</template>

<style lang="scss">
	.group {
		padding: 8px 0;
		&:not(:first-child) {
			padding-top: 0;
		}
		&:not(:last-child)::after {
			content: "";
			display: block;
			margin: 8px 0 0;
			height: 1px;
			background: var(--border-alt);
		}
	}
	.title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 13px;
		color: var(--text-tertiary);
		margin: 0 14px 4px;
		padding: 4px 0;
		user-select: none;
	}
</style>