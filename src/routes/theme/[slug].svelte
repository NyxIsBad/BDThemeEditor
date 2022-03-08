<script lang="ts" context="module">
	import type {Load} from '@sveltejs/kit';

	export const load: Load = async({params, fetch, url}) => {
		const {slug} = params;
		const preset = url.searchParams.get('preset');

		const req = await fetch(`${slug}.json${preset ? `?preset=${preset}` : ''}`);
		const {theme, addons} = await req.json();

		if (req.ok) {
			return {
				props: {
					theme,
					addons
				}
			}
		}
		return {
			status: 502,
			error: 'something went wrong'
		}

	}
</script>

<script lang="ts">
	import {Icon} from '@steeze-ui/svelte-icon';
	import {ArrowLeft, InformationCircle, Check, DesktopComputer, Photograph, Sun, Moon, ColorSwatch, MenuAlt1, Puzzle, Globe, Home, User, Server, Cog, Chat, SwitchVertical} from '@steeze-ui/heroicons';
	import {THEME, isMounted} from '$lib/stores';
	import {browser} from '$app/env';
	import {afterNavigate} from '$app/navigation';
	import {onMount, onDestroy} from 'svelte';
	import tooltip from '$lib/tooltip';
	import {previewAction} from '$lib/preview';
	import NProgress from 'nprogress';

	// types
	import type {IAddon} from '$types/addon';
	import type {ITheme} from '$types/theme';

	import {Preview, Actions, Component} from '$components/editor';

	import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from '$components/common';
	
	export let theme: ITheme;
	export let addons: IAddon[];

	const icons = {Photograph, Sun, ColorSwatch, MenuAlt1, Puzzle, Globe, Home, User, Server, Cog, Chat, DesktopComputer, Moon, SwitchVertical}

	// Construct theme object
	$THEME = {
		name: theme.name,
		meta: theme.meta,
		imports: theme.imports,
		fonts: theme.fonts,
		variables: theme.variables,
		hiddenVars: theme.hiddenVars,
		addons,
		varGroups: [':root', ...theme.varGroups]
	}

	onMount(() => {
		NProgress.done();
		$isMounted = true;
		previewAction({
			action: 'reset'
		})
	});
	onDestroy(() => $isMounted = false);

	// Developer warning
	let devWarning: boolean = browser && !localStorage.dev_warning;
	const closeDevWarning = (): void => {
		devWarning = false;
		localStorage.dev_warning = 'true';
	}


	// Active setting
	let activeSetting: number = 0;
	const setSetting = (index: number, modal?: boolean): void => {
		activeSetting = index;

		if (modal) previewAction({action: 'toggleModal'});
	}


	// Back to theme selection
	let backModal: boolean = false;
	const toggleBack = (): boolean => backModal = !backModal;
</script>

<svelte:head>
	<title>{theme.name} - Theme Editor</title>
	<meta property="og:title" content="{theme.name} - Theme Editor">
	<meta name="description" content="Customize {theme.name} with a easy to use interface">
	<meta property="og:image" content={theme.thumbnail}>
	<meta property="og:description" content="Customize {theme.name} with a easy to use interface">
</svelte:head>

<template>
	<div class="editor">
		<div class="left">
			<nav class="nav">
				<button
					class="btn back"
					use:tooltip={{
						content: 'Theme selection',
						placement: 'right'
					}}
					on:click={toggleBack}
				>
					<Icon src={ArrowLeft} size="18" />
				</button>
				<div class="scroller">
					<div class="scroller-inner">
						{#each $THEME.variables as group, i}
							<button
								class="btn"
								class:active={activeSetting === i}
								use:tooltip={{
									content: group.title,
									placement: 'right'
								}}
								on:click={() => setSetting(i, group.userModal)}
							>
								<Icon src={icons[group.icon]} size="24" />
							</button>
						{/each}
					</div>
				</div>
				<a
					href="https://discord.gg/ZHthyCw"
					target="_blank"
					rel="noreferrer"
					class="btn bug"
					use:tooltip={{
						content: 'Found a bug?',
						placement: 'right'
					}}
				>
					<Icon src={InformationCircle} size="24" />
				</a>
			</nav>
			<aside class="sidebar">
				<Actions />
				{#if devWarning}
					<div class="devWarning">
						<div class="markdown">
							<p>Before you start editing, just a little heads up:</p>
							<p>If you find any bugs with this editor, please do not annoy the theme developers.</p>
							<p>Join my <a href="https://discord.gg/ZHthyCw" target="_blank" rel="noreferrer">Discord Server</a> and tell me about them there.</p>
							<p>After closing this, you can still join my server and report a bug by pressing the button in the very bottom left of your screen.</p>
						</div>
						<Button style="secondary" on:click={closeDevWarning}>
							<Icon src={Check} size="18" />
							I Understand
						</Button>
					</div>
				{/if}
				<div class="content scroller">
					<div class="scroller-inner">
						{#each $THEME.variables as group, i}
							<div class="setting" class:active={activeSetting === i}>
								{#each group.inputs as setting}
									<div class="option">
										<Component data={setting} />
									</div>
								{/each}
							</div>
						{/each}
					</div>
				</div>
			</aside>
		</div>
		<Preview url={theme.previewUrl} />
	</div>

	<Modal bind:visible={backModal}>
		<ModalHeader>Back to theme selection?</ModalHeader>
		<ModalBody>
			<p>Any changes will <u>NOT</u> be saved.</p>
		</ModalBody>
		<ModalFooter>
			<Button style="secondary" on:click={toggleBack}>Close</Button>
			<Button style="primary" href="/themes">
				<Icon src={Check} size="18" />
				Go back
			</Button>
		</ModalFooter>
	</Modal>
	
</template>

<style lang="scss">
	.editor {
		display: flex;
		height: 100%;
	}
	.left {
		display: flex;
	}
	.nav {
		min-width: 64px;
		max-width: 64px;
		border-right: 1px solid var(--border);
		background: var(--bg-content-alt);
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.scroller {
		width: 100%;
	}
	.btn {
		height: 64px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color .15s ease;
		position: relative;
		&::before {
			content: "";
			position: absolute;
			left: 0;
			width: 4px;
			height: 28px;
			background: var(--text-secondary);
			border-radius: 0 3px 3px 0;
			transform: scale(0);
			transition: transform .15s ease;
		}
		&:hover {
			color: var(--text-primary);
			&::before {
				transform: scale(1, .5);
			}
		}
		&.active {
			color: hsl(var(--accent));
			&::before {
				background: hsl(var(--accent));
				transform: scale(1);
			}
		}
	}
	.back {
		border-bottom: 1px solid var(--border);
	}
	.bug {
		border-top: 1px solid var(--border);
	}

	.sidebar {
		min-width: 400px;
		max-width: 400px;
		border-right: 1px solid var(--border);
		background: var(--bg-content-alt);
		height: 100%;
		display: flex;
		flex-direction: column;
		.scroller-inner {
			padding: 16px;
		}
	}

	.devWarning {
		background: var(--bg-alt);
		padding: 16px;
		border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		.markdown {
			margin-bottom: 16px;
		}
	}

	.setting {
		display: none;
		flex-direction: column;
		gap: 16px;
		&.active {
			display: flex;
		}
	}
</style>