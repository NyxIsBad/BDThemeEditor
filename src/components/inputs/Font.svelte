<script lang="ts">
	import {THEME} from '$lib/stores';
	import {createEventDispatcher} from 'svelte';
	import {previewAction} from '$lib/preview';

	const dispatch = createEventDispatcher();

	import {Input} from '$components/common';

	// Required vars
	export let variable: string;
	export let value: string;
	export let index: number;
	export let title: string;

	// Optional vars
	export let varGroup: string = ':root';

	let local: boolean = false;

	$: if (local) {
		previewAction({
			action: 'removeFont',
			index
		})
		$THEME.fonts.splice(index, 1);
	}

	const update = (): void => {

		const output = value.split(',').map(font => font.trim());
		
		if (!local && !value.includes('Whitney')) {
			const fontUrl: string = `https://fonts.googleapis.com/css2?family=${output[0].replace(/ /g, '+')}:wght@100;300;400;500;700&display=swap`;
			const fontImport: string = `@import url('${fontUrl}');`;

			$THEME.fonts[index] = fontUrl;

			previewAction({
				action: 'addFont',
				index,
				text: fontImport
			});
		}

		dispatch('update', {variable, value: output.join(','), varGroup});
	}
</script>

<template>
	<header class="header">
		<p class="title">{title}</p>
	</header>
	<div class="body">
		<Input placeholder="Font name" bind:value on:change={update} />
		<small class="hint">Click away or press Enter to update preview.</small>
		<label class="local">
			<input type="checkbox" bind:checked={local} class="checkbox">
			Use font installed on my computer
		</label>
		{#if !local}
			<div class="google">
				View available fonts on <a href="https://fonts.google.com" target="_blank" rel="noreferrer" class="anchor">Google Fonts</a>
			</div>
		{/if}
	</div>
</template>

<style lang="scss">
	.header {
		margin-bottom: 8px;
	}
	.hint {
		color: var(--text-tertiary);
		font-size: 12px;
	}
	.local {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 12px;
		cursor: pointer;
	}
	.checkbox {
		appearance: none;
		max-width: 24px;
		min-width: 24px;
		max-height: 24px;
		min-height: 24px;
		border-radius: 4px;
		background-color: var(--control-bg);
		cursor: pointer;
		&:hover {
			background-color: var(--control-bg-hover);
		}
		&:checked {
			background-color: hsl(var(--accent));
			background-image: url('data:image/svg+xml; utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>');
		}
	}
	.google {
		border: 1px solid var(--border);
		border-radius: 4px;
		margin-top: 16px;
		padding: 16px;
		font-size: 14px;
		background: var(--bg-content);
	}
</style>