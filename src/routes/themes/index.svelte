<script lang="ts" context="module">
	import type {Load} from '@sveltejs/kit';

	export const load: Load = async({fetch}) => {
		const req = await fetch('themes.json');
		const themes = await req.json();

		return {
			props: { themes	}
		}
	}
</script>

<script lang="ts">
	export let themes: any[];
</script>

<template>
	{#each themes as theme}
		<a href="/theme/{theme.name.toLowerCase()}">{theme.name} - {theme.developer.name}</a>
	{/each}
</template>

<style lang="scss">

</style>