<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import tooltip from '$lib/tooltip';
	import {Icon} from '@steeze-ui/svelte-icon';
	import {XCircle, PlusCircle} from '@steeze-ui/heroicons';

	const dispatch = createEventDispatcher();

	export let index: number;
	export let array: any;
	export let type: string;;

	const remove = () => dispatch('remove');
	const add = () => dispatch('add');
</script>

<template>
	<div class="btns">
		{#if index !== 0}
			<button
				type="button"
				class="remove"
				use:tooltip={{content: `Remove ${type}`}}
				on:click={remove}
			>
				<Icon src={XCircle} size="24" />
			</button>
		{/if}
		{#if array.length - 1 === index}
			<button
				type="button"
				class="add"
				use:tooltip={{content: `Add new ${type}`}}
				on:click={add}
			>
				<Icon src={PlusCircle} size="24" />
			</button>
		{/if}
	</div>
</template>

<style lang="scss">
	.btns {
		display: flex;
		&:empty {
			display: none;
		}
	}
	button {
		margin-left: 8px;
		display: inline-flex;
	}
	.add {
		color: hsl(var(--green));
	}
	.remove {
		color: hsl(var(--red));
	}
</style>