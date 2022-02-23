<script lang="ts">
	export let value: string | number = '';
	/**
	 * Input type.  
	 * Default = `text`
	 */
	export let inputType: 'text'|'number' = 'text';
	export let placeholder: string = null;
	export let error: any = null;
	/** Minimum number when the `inputType` is set to `number` */
	export let min: number = 0;
	/** Maximum number when the `inputType` is set to `number` */
	export let max: number | undefined = undefined;
	
	export let step: number | undefined = undefined;
</script>

<template>
	{#if inputType === 'text'}
		<input
			type="text"
			class="input"
			class:error
			{placeholder}
			bind:value
			on:change
			on:input
			on:keyup
		>
	{:else}
		<input
			type="number"
			class="input"
			class:error
			{placeholder}
			{min}
			{max}
			{step}
			bind:value
			on:change
			on:input
			on:keyup
		>
	{/if}
</template>

<style lang="scss">
	.input {
		height: 38px;
		border-radius: 4px;
		font-size: 14px;
		border: 2px solid var(--control-border);
		padding: 0 12px;
		background: transparent;
		width: 100%;
		transition: .15s ease border-color,
								.15s ease color,
								.15s ease box-shadow;
		outline: none;
		&:hover {
			border-color: var(--control-border-hover);
		}
		&:focus {
			border-color: hsl(var(--accent));
			box-shadow: 0 0 0 5px hsl(var(--accent) / .2);
			color: var(--text-primary);
		}
		
		&.error {
			border-color: hsl(var(--red));
			&:focus {
				border-color: hsl(var(--red));
				box-shadow: 0 0 0 5px hsl(var(--red) / .2);
			}
		}
	}
</style>