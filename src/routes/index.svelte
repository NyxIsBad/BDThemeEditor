<script lang="ts">
	import {Icon} from '@steeze-ui/svelte-icon';
	import {ColorSwatch} from '@steeze-ui/heroicons';

	import {Button} from '$components/common';
</script>

<template>
	<div class="container">
		<div class="content wrap">
			<h1 class="title"><span>BetterDiscord</span> Theme Editor</h1>
			<p class="text">Get your desired theme in a manor of minutes with no CSS knowledge required.</p>
			<div class="btns">
				<Button href="/themes" style="primary" size="large">
					<Icon src={ColorSwatch} size="22" />
					Edit a theme
				</Button>
				<Button href="/presets" style="secondary" size="large">Browse community presets</Button>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.container {
		height: calc(100vh - 80px);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title {
		font-size: 48px;
		color: var(--text-primary);
		font-family: var(--font-display);
		span {
			color: hsl(var(--accent));
			text-shadow: 0 2px 12px hsl(var(--accent) / .4);
		}
	}
	.text {
		font-size: 18px;
		margin-top: 12px;
	}

	.btns {
		margin-top: 56px;
		display: flex;
		gap: 16px;
	}
</style>