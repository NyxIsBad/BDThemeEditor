<script lang="ts">
	import type {Theme, User} from '@prisma/client';

	export let data: Theme & {user: User};
</script>

<template>
	<a href="/theme/{data.name.toLowerCase()}" class="card">
		<img src={data.thumbnail} alt="Theme thumbnail" class="thumbnail">
		<div class="body">
			<img src={data.user.avatar} alt="User avatar" class="avatar">
			<div class="info">
				<h4 class="name">{data.name}</h4>
				<p class="description">{data.meta['description']}</p>
			</div>
		</div>
	</a>
</template>

<style lang="scss">
	.card {
		display: block;
		background: var(--bg-content);
		border-radius: 4px;
		overflow: hidden;
		border: 1px solid var(--border-mid);
		&:hover {
			border-color: hsl(var(--accent));
			box-shadow: 0 0 0 4px hsl(var(--accent) / .15);
		}
	}
	.thumbnail {
		display: block;
		object-fit: cover;
		width: 100%;
	}
	.body {
		padding: 12px;
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.avatar {
		width: 42px;
		height: 42px;
		background: var(--bg-content-alt);
		border-radius: 50%;
		overflow: hidden;
	}
	.name {
		font-family: var(--font-display);
		color: var(--text-primary);
		font-weight: 600;
	}
	.description {
		margin-top: 4px;
		font-size: 14px;
	}
</style>