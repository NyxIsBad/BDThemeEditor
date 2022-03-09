<script lang="ts">
	export let href: string | null = null;
	export let style: 'primary' | 'secondary' | 'danger';
	export let size: 'small' | 'medium' | 'large' = 'medium';

	export let newTab: boolean = false;
	export let type: 'submit' | 'button' = 'button';
	export let external: boolean = false;
	export let long: boolean = false;
</script>

<template>
	{#if href}
		<a
			{href}
			class="btn {style} {size}"
			target={newTab ? '_blank' : undefined}
			rel={(newTab ? 'noreferrer' : undefined) || (external ? 'external' : undefined)}
			class:long
		>
			<div class="content">
				<slot />
			</div>
		</a>
	{:else}
		<button
			{type}
			class="btn {style} {size}"
			class:long
			on:click
		>
			<div class="content">
				<slot />
			</div>
		</button>
	{/if}
</template>

<style lang="scss">
	.btn {
		--colour: var(--accent);
		display: inline-flex;
		align-items: center;
		font-weight: 500;
		user-select: none;
		outline: 2px solid transparent;
		outline-offset: 0;
		
		.content {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: var(--gap);
			width: 100%;
		}

		&:focus {
			outline-color: hsl(var(--colour));
			outline-offset: 3px;
		}

		// Styles
		&.primary {
			background: hsl(var(--accent));
			color: #000;
			transition: box-shadow .15s ease, outline-offset .15s ease, outline-color .15s ease;
			
			.content {
				filter: drop-shadow(0 1px 4px hsl(0 0% 0% / .4));
			}

			&:hover {
				box-shadow: inset 0 0 0 100vmax hsl(0 0% 0% / .14);
			}
			&:focus {
				box-shadow: inset 0 0 0 100vmax hsl(0 0% 0% / .14);
			}
		}
		&.secondary {
			border: 2px solid var(--control-border);
			color: var(--text-secondary);
			transition: color .15s ease, border-color .15s ease, outline-offset .15s ease, outline-color .15s ease;
			&:hover {
				border-color: var(--control-border-hover);
				color: var(--text-primary);
			}
			&:focus {
				color: var(--text-primary);
				border-color: var(--control-border-hover);
			}
		}
		&.danger {
			--colour: var(--red);
			background: hsl(var(--red));
			color: #fff;
			transition: box-shadow .15s ease, outline-offset .15s ease, outline-color .15s ease;
			
			.content {
				filter: drop-shadow(0 1px 4px hsl(0 0% 0% / .4));
			}

			&:hover {
				box-shadow: inset 0 0 0 100vmax hsl(0 0% 0% / .14);
			}
			&:focus {
				box-shadow: inset 0 0 0 100vmax hsl(0 0% 0% / .14);
			}
		}

		// Sizes
		&.small {
			padding: 6px 12px;
			border-radius: 3px;
			font-size: 12px;
			--gap: 6px;
		}
		&.medium {
			padding: 10px 14px;
			border-radius: 4px;
			font-size: 14px;
			--gap: 8px;
		}
		&.large {
			padding: 16px 32px;
			border-radius: 6px;
			font-size: 18px;
			--gap: 14px;
		}

		// States
		&.long {
			display: flex;
			width: 100%;
		}
	}
</style>