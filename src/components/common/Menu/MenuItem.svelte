<script lang="ts">
	import {getContext, createEventDispatcher} from 'svelte';

	import type {Writable} from 'svelte/store';
	
	const dispatch = createEventDispatcher();

	let visible: Writable<boolean> = getContext('visible');

	/** Indicates the button is dangerous and is red in colour. */
  export let danger: boolean = false;

	/** Location to navigate to. An anchor tag will be used instead of a button. */
  export let href: string | undefined = undefined;

	/** Open the location in a new tab. */
  export let newTab: boolean = false;

	/**
	 * Displays a switch on the menu item.  
	 * on:change event is parsed and hideOnClick is disabled by default.
	 */
	export let boolean: boolean = false;

	/**
	 * Disable the button. Turning it opaque and disabling the click event.  
	 * Click event will not fire even if styling is removed.
	 */
	export let disabled: any = undefined;

	/** Hide the dropdown when clicked. Defaulted to true. */
	export let hideOnClick: boolean = boolean || true;

	export let external: boolean = false;

	const close = (): void => {
		if (!disabled) dispatch('click');
		if (hideOnClick) $visible = false;
	}
</script>

<template>
	{#if href}
		<a
			{href}
			target={newTab ? '_blank' : null}
			rel={(newTab ? 'noreferrer' : undefined) || (external ? 'external' : undefined)}
			class="item"
			class:danger
			on:click={close}
		>
			<slot />
		</a>
	{:else}
		<button
			type="button"
			class="item"
			class:danger
			on:click={close}
		>
			<slot />
		</button>
	{/if}
</template>

<style lang="scss">
	.item {
		padding: 10px 14px;
		display: flex;
		align-items: center;
		border-radius: 4px;
		gap: 10px;
		width: 100%;
		font-weight: 500;
		cursor: pointer;
		user-select: none;
		font-size: 14px;
		&.danger {
			color: hsl(var(--red));
		}

		&:not(:last-child) {
			margin-bottom: 4px;
		}
		&:hover, &:focus {
			background: var(--interactive-hover);
			color: var(--text-primary);
		}
	}
</style>