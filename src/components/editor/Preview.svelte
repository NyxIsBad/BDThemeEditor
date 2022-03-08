<script lang="ts">
	import {dev} from '$app/env';
	import {onDestroy} from 'svelte';
	import {loaded, preview} from '$lib/stores';

	export let url: string;

	let iframe: HTMLIFrameElement;

	const onLoad = (): void => {
		$preview = iframe;
		$loaded = true;
	}
	onDestroy(() => $loaded = false);
</script>

<template>
	<div class="container">
		<iframe
			bind:this={iframe}
			on:load={onLoad}
			src="https://gibbu.github.io/ThemePreview?file={url}"
			frameborder="0"
			title=""
		/>
	</div>
</template>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		padding: 16px;
		position: relative;
		iframe {
			width: 100%;
			height: 100%;
			border: 1px solid var(--border);
		}
	}
</style>