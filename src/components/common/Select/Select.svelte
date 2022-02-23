<script lang="ts">
	import clickOutside from '$lib/clickOutside';
	import {createEventDispatcher} from 'svelte';
	import {Icon} from '@steeze-ui/svelte-icon';
	import {Selector, Check} from '@steeze-ui/heroicons';

	const dispatch = createEventDispatcher();

	import {Input} from '$components/common';

	// Types
	interface Option {
		label: string,
		value: string | boolean | number
	}

	export let options: Option[]
	export let value: string | boolean | number = '';
	export let custom: boolean = false;
	export let long: boolean = false;

	// Values
	$: selected = options.find(el => el.value === value) || options[0];
	let customValue: string;

	// Dropdown
	let selectBtn: HTMLButtonElement;
	let visible: boolean = false;

	const toggle = (): void => {
		visible = !visible;
	}
	const hide = (): void => {
		visible = false;
	}

	// Set values
	const setOption = (option: Option): void => {
		if (option.value !== 'custom') {
			update(option.value);
		}
		selected = option;
		hide();
	}

	const update = (value: string | boolean | number): void => {
		dispatch('update', value);
	}
</script>

<template>
	<div class="select" class:long>
		<button type="button" bind:this={selectBtn} class="btn" on:click={toggle}>
			<span class="btn-text">{selected.label}</span>
			<div class="btn-icon">
				<Icon src={Selector} size="18" />
			</div>
		</button>
		{#if visible}
			<div
				class="dropdown"
				use:clickOutside={{
					exclude: selectBtn,
					outside: hide
				}}>
				{#each options as option}
					<button class="option" class:active={selected.value === option.value} on:click={() => setOption(option)}>
						<span class="option-label">{option.label}</span>
						{#if selected.value === option.value}
							<div class="option-check">
								<Icon src={Check} size="18" />
							</div>
						{/if}
					</button>
				{/each}
				{#if custom}
					<hr class="dropdown-divider">
					<button class="option" class:active={selected.value === 'custom'} on:click={() => setOption({label: 'Custom value', value: 'custom'})}>
						<span class="option-label">Custom value</span>
						{#if selected.value === 'custom'}
							<div class="option-check">
								<Icon src={Check} size="18" />
							</div>
						{/if}
					</button>
				{/if}
			</div>
		{/if}
	</div>
	{#if selected.value === 'custom'}
		<div class="select-custom">
			<Input placeholder="Custom value" bind:value={customValue} on:input={() => update(customValue)} />
		</div>
	{/if}
</template>

<style lang="scss">
	.select {
		position: relative;
		&.long {
			width: 100%;
		}
		&-custom {
			margin-top: 8px;
		}
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 500;
		border-radius: 4px;
		transition: .15s ease background, .15s ease box-shadow, .15s ease color;
		user-select: none;
		line-height: normal;
		font-size: 14px;
		height: 38px;
		padding: 0 12px;
		color: var(--text-secondary);
		background: var(--control-bg);
		width: 100%;

		&-icon {
			width: 16px;
		}

		&:hover {
			background: var(--control-bg-hover);
		}
		&:focus {
			background: var(--control-bg-hover);
			color: var(--text-primary);
		}
	}
	.dropdown {
		position: absolute;
		top: calc(100% + 8px);
		background: var(--bg-content-alt);
		border-radius: 4px;
		border: 1px solid var(--border);
		width: 100%;
		padding: 8px;
		z-index: 1;
		box-shadow: var(--elevation-close);
		&-divider {
			margin: 8px 0;
			border: none;
			height: 1px;
			background: var(--border);
		}
	}
	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 8px 12px;
		text-align: left;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;

		&-check {
			height: 18px;
			width: 18px;
		}

		&:not(:last-child) {
			margin-bottom: 4px;
		}
		&:hover {
			background: var(--interactive-hover);
		}
		&:focus {
			background: var(--interactive-active);
		}
		&.active {
			background: hsl(var(--accent));
			color: #000;
			text-shadow: 0 2px 5px hsl(0 0% 0% / .4);
		}
	}
</style>