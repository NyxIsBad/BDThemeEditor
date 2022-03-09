<script lang="ts">
	import {fade, fly} from 'svelte/transition';
	import portal from '$lib/portal';

	/**
	 * Visibility of the modal.  
	 * Use `bind:visible`.
	 */
	export let visible: boolean = false;

	/** Set the max width of the modal. */
	export let maxWidth: number = 460;

	/** 
	 * Allow the user to click the backdrop to close the modal.  
	 * Default = `true`
	 */
	export let clickOutside: boolean = true;

	const close = () => {
		if (clickOutside) visible = false;
	}
</script>

<template>
	{#if visible}
		<div class="modal-container" use:portal={"#layers"}>
			<div class="backdrop" transition:fade={{duration: 150}} on:click={close}></div>
			<div class="modal" transition:fly={{duration: 200, y: 5}} style="max-width: {maxWidth}px;">
				<slot />
			</div>
		</div>
	{/if}
</template>

<style lang="scss">
	.modal-container {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 5vh;
		z-index: 10;
	}
	
	.backdrop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgb(0 0 0 / .5);
	}

	.modal {
		position: relative;
		z-index: 1;
		width: 100%;
		border-radius: 4px;
		background: var(--bg-main);
		border: 1px solid var(--border-mid);
	}
</style>