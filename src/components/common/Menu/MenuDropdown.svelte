<script lang="ts">
	import clickOutside from '$lib/clickOutside';
	import {browser} from '$app/env';
	import {getContext} from 'svelte';
	import type {Writable} from 'svelte/store';

	/**
	 * Position of the dropdown.  
	 * Default = `right`.
	 */
	export let position: 'left' | 'right' = 'right';

	let visible: Writable<boolean> = getContext('visible');
	let menuBtn: Writable<HTMLElement|null> = getContext('menuBtn');

	const keyActions = (e: KeyboardEvent): void => {
		if (e.key === 'Escape') $visible = false;
		if ($visible && e.key === 'Enter') $menuBtn.focus();
	}

	let triangleX: number = 0;
	$: if ($visible && browser) {
		window.addEventListener('keyup', keyActions);
		triangleX = $menuBtn.getBoundingClientRect().width / 2 - 7;
	} else if (!$visible && browser) {
		window.addEventListener('keyup', keyActions);
	}
</script>

<template>
	{#if $menuBtn && $visible}
		<div
			class="dropdown {position}"
			use:clickOutside={{
				exclude: $menuBtn,
				outside: () => $visible = false
			}}
		>
			<div class="triangle" style="transform: translateX({position === 'left' ? '-' : ''}{triangleX.toFixed()}px) rotate(45deg);"></div>
			<div class="content">
				<slot />
			</div>
		</div>
	{/if}
</template>

<style lang="scss">
	.dropdown {
		width: 280px;
		position: absolute;
		background: var(--bg-content);
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 0 8px;
		top: calc(100% + 16px);
		box-shadow: var(--elevation-close);
		&.right {
			transform-origin: top left;
			left: 0;
			.triangle {
				left: 0;
			}
		}
		&.left {
			transform-origin: top right;
			right: 0;
			.triangle {
				right: 0;
			}
		}
	}
	.triangle {
		position: absolute;
		top: -6px;
		width: 10px;
		height: 10px;
		transform: rotate(45deg);
		background: var(--bg-content);
		border-top: 1px solid var(--border);
		border-left: 1px solid var(--border);
	}
</style>