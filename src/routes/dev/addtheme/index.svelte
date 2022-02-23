<script lang="ts" context="module">
	import type {Load} from '@sveltejs/kit';

	export const load: Load = ({session}) => {

		if (!session.auth?.developer) {
			return {
				status: 403
			}
		}
		return {
			status: 200
		}
	}
</script>

<script lang="ts">
	import {ThemeForm} from '$components/page';
</script>

<template>
	<div class="wrap">
		<ThemeForm />
	</div>
</template>

<style>
	.wrap {
		padding-bottom: 500px;
	}
</style>