<script lang="ts">
	import {session} from '$app/stores';

	import {Icon} from '@steeze-ui/svelte-icon';
	import {Code, Login, Logout, User, ClipboardList, Cog, ChevronDown, ColorSwatch} from '@steeze-ui/heroicons';

	import {Button, Menu, MenuButton, MenuDropdown, MenuGroup, MenuItem} from '$components/common';
</script>

<template>
	{#if $session.auth}
		<Menu>
			<MenuButton>
				<div class="auth">
					<img class="avatar" src={$session.auth.avatar} alt="User avatar">
					<Icon src={ChevronDown} size="14" />
				</div>
			</MenuButton>
			<MenuDropdown position="left">
				<MenuGroup>
					<MenuItem href="/">
						<Icon src={User} size="16" />
						Profile
					</MenuItem>
					<MenuItem>
						<Icon src={Cog} size="16" />
						Settings
					</MenuItem>
				</MenuGroup>
				{#if $session.auth.moderator || $session.auth.admin || $session.auth.developer}
					<MenuGroup>
						{#if $session.auth.moderator}
							<MenuItem href="/mod/submissions">
								<Icon src={ClipboardList} size="16" />
								Submissions
							</MenuItem>
						{/if}
						{#if $session.auth.developer}
							<MenuItem href="/dev/addtheme">
								<Icon src={ColorSwatch} size="16" />
								Add Theme
							</MenuItem>
						{/if}
					</MenuGroup>
				{/if}
				<MenuGroup>
					<MenuItem href="/auth/logout" danger external>
						<Icon src={Logout} size="16" />
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
	}
	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--bg-content);
	}
</style>