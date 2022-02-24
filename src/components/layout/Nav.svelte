<script lang="ts">
	import {page} from '$app/stores';
	import {Icon} from '@steeze-ui/svelte-icon';
	import {Code} from '@steeze-ui/heroicons';

	import Auth from './Auth.svelte';

	console.log($page.url.pathname);
</script>

<template>
	<nav class="container">
		<div class="wrap">
			<div class="links">
				<a href="/" class="logo">
					<Icon src={Code} />
				</a>
				<a href="/themes" class="link" class:active={$page.url.pathname === '/themes'}>Themes</a>
				<a href="/presets" class="link" class:active={$page.url.pathname === '/presets'}>Presets</a>
			</div>
			<div class="auth">
				<Auth />
			</div>
		</div>
	</nav>
</template>

<style lang="scss">
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: var(--bg-main);
		z-index: 10;
		height: 64px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--border-mid);
	}
	.wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		align-items: center;
	}

	.links {
		display: flex;
		align-items: center;
		gap: 32px;
	}
	.link {
		font-weight: 600;
		font-size: 14px;
		font-family: var(--font-display);
		height: 63px;
		display: flex;
		align-items: center;
		&:hover {
			color: var(--text-primary);
		}
		&.active {
			box-shadow: inset 0 -1px 0 hsl(var(--accent)), 0 1px 0 hsl(var(--accent));
			color: var(--text-primary);
		}
	}
	.logo {
		width: 32px;
		height: 32px;
		display: block;
		margin-right: 16px;
	}
</style>