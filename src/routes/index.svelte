<script lang="ts">
	import {Icon} from '@steeze-ui/svelte-icon';
	import {ArrowRight, ColorSwatch, Pencil, Share} from '@steeze-ui/heroicons';

	import {Button} from '$components/common';
</script>

<template>
	<div class="wrap">
		<section class="banner">
			<h1 class="banner-title">BetterDiscord Theme Editor</h1>
			<p class="banner-text">Get your desired theme in a manor of minutes with no CSS knowledge required.</p>
			<div class="banner-btns">
				<Button href="/themes" style="primary">
					<Icon src={ColorSwatch} size="20" />
					Edit a theme
				</Button>
				<Button href="/presets" style="secondary">Browse community presets</Button>
			</div>
		</section>

		<section class="steps">
			<div class="step">
				<h3 class="step-title">
					<div class="step-icon">
						<Icon src={ColorSwatch} size="20" />
					</div>
					Choose a base theme
				</h3>
				<div class="step-body">
					<p class="step-text">We have a wide range of themes to start editing provided by the community.</p>
					<p class="step-text">Select one and start editing!</p>
					<a href="/themes" class="step-anchor">
						Chose a theme
						<Icon src={ArrowRight} size="16" />
					</a>
				</div>
			</div>
			<div class="step">
				<h3 class="step-title">
					<div class="step-icon">
						<Icon src={Pencil} size="20" />
					</div>
					Edit to your liking
				</h3>
				<div class="step-body">
					<p class="step-text">No need to learn and mess around with CSS. Get straight to making your theme!</p>
				</div>
			</div>
			<div class="step">
				<h3 class="step-title">
					<div class="step-icon">
						<Icon src={Share} size="20" />
					</div>
					Share your theme
				</h3>
				<div class="step-body">
					<p class="step-text">Once you're done editing your theme, share it with everyone else. Which can edit, download, and share their awesome edits!</p>
					<a href="/presets" class="step-anchor">
						Browse presets
						<Icon src={ArrowRight} size="16" />
					</a>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss">
	.banner {
		height: calc(100vh - 64px);
		max-height: 800px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&-title {
			font-family: var(--font-display);
			color: var(--text-primary);
			font-size: 48px;
			margin-bottom: 8px;
		}
		&-text {
			font-size: 18px;
		}
		&-btns {
			margin-top: 46px;
			display: flex;
			gap: 12px;
		}
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 60px;
		justify-content: space-between;
	}

	.step {
		&-title {
			color: var(--text-primary);
			font-family: var(--font-display);
			margin-bottom: 12px;
			display: flex;
			align-items: center;
		}
		&-icon {
			display: flex;
			margin-right: 16px;
			color: hsl(var(--accent));
			filter: drop-shadow(0 1px 4px hsl(var(--accent) / .5))
		}
		&-body {
			padding-left: 36px;
		}
		&-text {
			line-height: 1.5;
			&:not(:last-child) {
				margin-bottom: 6px;
			}
		}
		&-anchor {
			font-size: 14px;
			display: inline-flex;
			align-items: center;
			gap: 8px;
			margin-top: 12px;
			color: hsl(var(--accent));
			opacity: .5;
			&:hover {
				opacity: 1;
				text-decoration: underline;
			}
		}
	}
</style>