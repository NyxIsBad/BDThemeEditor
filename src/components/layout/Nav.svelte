<script lang="ts">
	import {session} from '$app/stores';
	import {Icon} from '@steeze-ui/svelte-icon';
	import {Code, Login, Logout, User, ClipboardList, Cog} from '@steeze-ui/heroicons';
	
	
	import Auth from './Auth.svelte';
	import {Button, Menu, MenuButton, MenuDropdown, MenuGroup, MenuItem} from '$components/common';
</script>

<template>
	<nav class="container">
		<div class="wrap">
			<a href="/" class="logo">
				<Icon src={Code} />
			</a>
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
		height: 80px;
		display: flex;
		align-items: center;
	}
	.wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		align-items: center;
	}
	.logo {
		width: 42px;
		height: 42px;
		display: block;
	}
</style>