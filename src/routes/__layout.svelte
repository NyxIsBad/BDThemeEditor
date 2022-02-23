<script lang="ts">
	import {navigating} from '$app/stores';
	import NProgress from 'nprogress';

	import Nav from '$components/layout/Nav.svelte';

	$: if ($navigating) {
		NProgress.start()
	} else {
		NProgress.done()
	}
</script>

<template>
	<Nav />

	<div id="page">
		<slot />
	</div>
</template>

<style lang="scss" global>
	@use '../styles/app.scss';
</style>