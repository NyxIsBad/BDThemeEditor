<script lang="ts">
	import {browser} from '$app/env';
	import axios from 'axios';
	import {Icon} from '@steeze-ui/svelte-icon';
	import {Upload, Save, Download, Share, ArrowLeft, CloudUpload} from '@steeze-ui/heroicons';
	import {downloadTheme} from '$lib/download';
	import {getUrl} from '$lib/helpers';
	import {THEME, disableShare} from '$lib/stores';

	import {Button, Input, Modal, ModalBody, ModalHeader, ModalFooter} from '$components/common';

	let value: string = '';

	// Validate
	const validateName = (): boolean => {
		const check = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
		if (value.length < 1) {
			errors.name = 'Your theme name must be longer than 1 character';
			return false;
		} else if (check.test(value)) {
			errors.name = 'Your theme name cannot contain any special characters';
			return false;
		} else {
			errors.name = null;
			return true;
		}
	}
	const validateThumbnail = (): boolean => {
		return true;
	}

	// Save
	let saveModal: boolean = false;
	let saveModalShare: boolean = false;
	let errors = {
		name: '',
		thumbnail: ''
	}

	const toggleModalState = (): boolean => saveModalShare = !saveModalShare;

	const submit = (): void => {
		if (!saveModalShare && validateName()) download();
		else if (saveModalShare && validateName() && validateThumbnail()) postPreset();
	}

	const download = (): void => {
		$THEME.meta.name = value;
		downloadTheme($THEME);
	}

	let form = {
		name: '',
		thumbnail: ''
	}
	const postPreset = async(): Promise<void> => {
		console.log('test');
		const {} = await axios.post('/presets.json', {
			...form,
			...$THEME,
		});
	}



	// Import
	// let importFile

</script>

<template>
	<header class="container">
		<Button style="secondary" long>
			<Icon src={Upload} size="18" />
			Import
		</Button>
		<Button style="primary" long on:click={() => saveModal = true}>
			<Icon src={Save} size="18" />
			Save
		</Button>
	</header>

	<Modal bind:visible={saveModal} maxWidth={500}>
		<ModalHeader>{saveModalShare ? 'Share Preset' : 'Download Theme'}</ModalHeader>
		<form on:submit|preventDefault={submit}>
			<ModalBody markdown={$disableShare.length && saveModalShare}>
				{#if !saveModalShare || saveModalShare && !$disableShare.length}
					<p class="label">Give your {saveModalShare ? 'preset' : 'theme'} a name:</p>
					<Input bind:value placeholder="{saveModalShare ? 'Preset' : 'Theme'} name" />
				{/if}
				{#if saveModalShare && !$disableShare.length}
					<p class="label">Give your preset a thumbnail:</p>
					<Input bind:value={form.thumbnail} placeholder="Imgur links only" />
				{:else if saveModalShare && $disableShare.length}
					<p>You cannot share a preset once you've set an image to Inline Encoding (base64).</p>
					<p>Either use the Imgur upload service or use a direct link.</p>
				{/if}
			</ModalBody>
			<ModalFooter>
				<Button style="secondary" on:click={toggleModalState}>
					{#if saveModalShare}
						<Icon src={ArrowLeft} size="18" />
						Back
					{:else}
						<Icon src={Share} size="18" />
						Share
					{/if}
				</Button>
				{#if saveModalShare && !$disableShare.length}
					<Button style="primary" type="submit">
						<Icon src={CloudUpload} size="18" />
						Post Preset
					</Button>
				{/if}
				{#if !saveModalShare}
					<Button style="primary" type="submit">
						<Icon src={Download} size="18" />
						Download
					</Button>
				{/if}
			</ModalFooter>
		</form>
	</Modal>
</template>

<style lang="scss">
	.container {
		height: 64px;
		border-bottom: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 16px;
		gap: 16px;
	}
	.label {
		margin-bottom: 4px;
		font-size: 14px;
		&:not(:first-child) {
			margin-top: 12px;
		}
	}
</style>