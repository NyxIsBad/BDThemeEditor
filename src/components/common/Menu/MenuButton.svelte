<script lang="ts">
	import {onMount, getContext} from 'svelte';
	import type {Writable} from 'svelte/store';

	// const ID = useId();
	let visible: Writable<boolean> = getContext('visible');
	let menuBtn: Writable<HTMLElement|null> = getContext('menuBtn');

	const toggle = () => {
		$visible = !$visible;
	}

	let btnEl: HTMLElement;

	onMount(() => {
		$menuBtn = btnEl;
	});
</script>

<template>
	<button
		bind:this={btnEl}
		on:click={toggle}
	>
		<slot />
	</button>
</template>