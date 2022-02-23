<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	export let group: string = '';
	export let value: string = '';
	export let checked: boolean = false;

	export let disabled: undefined | boolean = undefined;

	const handleEvent = (e: any) => {
		if (!disabled) dispatch(e.type);
	}
</script>

<template>
	<label class="item" class:selected={checked} aria-selected={checked} {disabled}>
		<input
			type="radio"
			bind:group
			on:change={handleEvent}
			on:focus={handleEvent}
			on:blur={handleEvent}
			{value}
			{checked}
			hidden
		>
		<div class="box"></div>
		<div class="content">
			<slot />
		</div>
	</label>
</template>

<style lang="scss">
	.item {
		position: relative;
		padding: 16px;
		display: flex;
		align-items: center;
		gap: 16px;
		cursor: pointer;
		border: 1px solid var(--control-border);
		z-index: 0;
		&:first-child {
			border-radius: 4px 4px 0 0;
		}
		&:last-child {
			border-radius: 0 0 4px 4px;
		}
		&:not(:first-child) {
			margin-top: -1px;
		}
		&:hover {
			color: var(--text-primary);
			border-color: var(--control-border-hover);
		}
		&.selected {
			background: hsl(var(--accent) / .1);
			color: hsl(var(--accent-text));
			border-color: hsl(var(--accent));
			z-index: 1;
			.box {
				background: hsl(var(--accent));
				border-color: hsl(var(--accent));
				&:before {
					background: #fff;
				}
			}
		}
	}
	.box {
		width: 20px;
		height: 20px;
		border: 2px solid var(--text-primary);
		border-radius: 50%;
		position: relative;
		&:before {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 60%;
			height: 60%;
			border-radius: 50%;
		}
	}
	.content {
		flex: 1;
		user-select: none;
		display: flex;
		align-items: center;
	}
</style>