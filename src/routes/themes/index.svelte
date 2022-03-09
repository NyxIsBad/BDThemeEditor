<script lang="ts">
	import {CardGrid, Card, Header} from '$components/page';
	import type {Theme, User} from '@prisma/client';

	export let themes: (Theme & {user: User})[];
</script>

<template>
	<div class="wrap">
		<Header title="Chose a theme" />
	</div>
	<CardGrid>
		{#each themes as data}
			<Card {data} />
		{/each}
	</CardGrid>
</template>

<style lang="scss">

</style>