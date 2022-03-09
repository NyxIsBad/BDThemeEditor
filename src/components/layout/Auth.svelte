<script lang="ts">
	import {session} from '$app/stores';

	import {Icon} from '@steeze-ui/svelte-icon';
	import {Login, Logout, User, ClipboardList, Cog, ChevronDown, ColorSwatch, UserGroup, Plus} from '@steeze-ui/heroicons';

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
							<MenuItem href="/dev/mythemes">
								<Icon src={ColorSwatch} size="18" />
								My Themes
							</MenuItem>
							<MenuItem href="/dev/addtheme">
								<Icon src={Plus} size="18" />
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
</style>