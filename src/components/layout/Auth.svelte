<script lang="ts">
	import {session} from '$app/stores';

	import {Icon} from '@steeze-ui/svelte-icon';
	import {Login, Logout, User, ClipboardList, Cog, ChevronDown, ColorSwatch, UserGroup} from '@steeze-ui/heroicons';

	import {Button, Menu, MenuButton, MenuDropdown, MenuGroup, MenuItem} from '$components/common';
</script>

<template>
	{#if $session.auth}
		<Menu>
			<MenuButton>
				<div class="auth">
					<img class="auth-avatar" src={$session.auth.avatar} alt="User avatar">
					<Icon src={ChevronDown} size="14" />
				</div>
			</MenuButton>
			<MenuDropdown position="left">
				<MenuGroup>
					<MenuItem href="/">
						<Icon src={User} size="18" />
						My Profile
					</MenuItem>
					<MenuItem href="/">
						<Icon src={Cog} size="18" />
						Settings
					</MenuItem>
				</MenuGroup>
				{#if $session.auth.admin || $session.auth.moderator || $session.auth.developer}
					<MenuGroup>
						{#if $session.auth.admin}
							<MenuItem href="/admin/users">
								<Icon src={UserGroup} size="18" />
								Users
							</MenuItem>
						{/if}
						{#if $session.auth.moderator}
							<MenuItem href="/mod/submissions">
								<Icon src={ClipboardList} size="18" />
								Submissions
							</MenuItem>
						{/if}
						{#if $session.auth.developer}
							<MenuItem href="/dev/addtheme">
								<Icon src={ColorSwatch} size="18" />
								Add Theme
							</MenuItem>
						{/if}
					</MenuGroup>
				{/if}
				<MenuGroup>
					<MenuItem href="/auth/logout" danger external>
						<Icon src={Logout} size="18" />
						Logout
					</MenuItem>
				</MenuGroup>
			</MenuDropdown>
		</Menu>
	{:else}
		<Button href="/auth/login" style="primary" external>
			<Icon src={Login} size="18" />
			Login
		</Button>
	{/if}
</template>

<style lang="scss">
	.auth {
		display: flex;
		align-items: center;
		gap: 4px;
		&-avatar {
			width: 32px;
			height: 32px;
			border-radius: 50%;
			background: var(--bg-content);
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: hsl(0 0% 0% / .5);
		z-index: 10;
	}
	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 400px;
		background: var(--bg-main);
		border-left: 1px solid var(--border-mid);
		z-index: 11;
		display: flex;
		flex-direction: column;
		&-header {
			padding: 16px;
			display: flex;
			align-items: center;
			gap: 16px;
		}
		&-avatar {
			width: 64px;
			height: 64px;
			border-radius: 50%;
			background: var(--bg-content);
		}
		&-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 8px;
			align-items: flex-start;
		}
		&-name {
			font-family: var(--font-display);
			color: var(--text-primary);
			font-weight: 600;
			font-size: 18px;
		}
		&-badges {
			display: flex;
			gap: 8px;
		}
		&-badge {
			display: inline-flex;
			color: var(--text-tertiary);
		}

		&-scroller {
			padding: 16px 4px 4px;
		}
		&-title {
			font-family: var(--font-display);
			font-size: 14px;
			font-weight: 600;
			color: var(--text-tertiary);
			margin: 0 0 4px 14px;
			&:not(:first-of-type) {
				margin-top: 24px;
			}
		}
		&-item {
			display: flex;
			align-items: center;
			gap: 14px;
			padding: 14px 14px;
			border-radius: 3px;
			&:hover {
				background: var(--interactive-hover);
				color: var(--text-primary);
			}
			&.danger {
				color: hsl(var(--red));
				&:hover {
					color: var(--text-primary);
				}
			}
		}
		&-footer {
			padding: 4px;
		}
	}
</style>