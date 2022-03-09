<script lang="ts">
	import {Icon} from '@steeze-ui/svelte-icon';
	import {Pencil, Trash, Check} from '@steeze-ui/heroicons';
	import api from '$lib/api';

	import {Header} from '$components/page';
	import {Button, Modal, ModalBody, ModalFooter} from '$components/common';

	import type {Theme} from '@prisma/client';

	export let themes: Theme[];

	let selectedTheme: Theme;
	let modal: boolean = false;

	const openModal = (theme: Theme): void => {
		selectedTheme = theme;
		modal = true;
	}
	const closeModal = (): void => {
		selectedTheme = null;
		modal = false;
	}

	const deleteTheme = async(): Promise<void> => {
		const {status} = await api.delete('/dev/mythemes', {
			data: {
				id: selectedTheme.id
			}
		})

		if (status === 200) {
			console.log('deleted theme');
			return;
		}
		console.log('something went wrong');
	}
</script>

<template>
	<div class="wrap">
		<Header title="My themes" />
		<main class="table">
			<header class="row head">
				<p class="col">Name</p>
				<p class="col j-right">Actions</p>
			</header>
			<div class="body">
				{#if themes.length}
					{#each themes as theme}
						<div class="row">
							<p class="col a-centre">{theme.name}</p>
							<div class="col j-right gap">
								<Button style="secondary" size="small">
									<Icon src={Pencil} size="18" />
									Edit
								</Button>
								<Button style="danger" size="small" on:click={() => openModal(theme)}>
									<Icon src={Trash} size="18" />
									Delete
								</Button>
							</div>
						</div>
					{/each}
				{:else}
					<div class="row">
						<div class="col">
							<p>No themes yet. <a href="/dev/addtheme" class="anchor">Add one!</a></p>
						</div>
					</div>
				{/if}
			</div>
		</main>
	</div>

	<Modal bind:visible={modal}>
		<ModalBody title="Delete {selectedTheme.name}?">
			<p>Deleting {selectedTheme.name} will remove it and all presets from the database.</p>
		</ModalBody>
		<ModalFooter>
			<Button style="secondary" on:click={closeModal}>Close</Button>
			<Button style="primary" on:click={deleteTheme}>
				<Icon src={Check} size="18" />
				Delete
			</Button>
		</ModalFooter>
	</Modal>
</template>

<style lang="scss">
	.head {
		display: flex;
		.col {
			font-size: 14px;
			color: var(--text-tertiary);
		}
	}
	.body {
		border-radius: 4px;
		border: 1px solid var(--border-mid);
		background: var(--bg-content);
	}
	.row {
		display: flex;
		&:not(:last-of-type) {
			border-bottom: 1px solid var(--border-mid);
		}
	}
	.col {
		padding: 12px;
		flex: 1;
		display: flex;
		&.gap {
			gap: 8px;
		}
		&.j-right {
			justify-content: flex-end;
		}
		&.a-centre {
			align-items: center;
		}
	}
</style>