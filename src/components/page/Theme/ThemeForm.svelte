<script lang="ts">
	import {Icon} from '@steeze-ui/svelte-icon';
	import {PlusCircle, XCircle, InformationCircle, Moon, Home, Sun, User, Photograph, ViewList, StatusOnline, Adjustments, Cog, AtSymbol, ColorSwatch, GlobeAlt, Chat, Collection} from '@steeze-ui/heroicons';
	import {Input, Select} from '$components/common';
	import {templates} from './templates';
	import tooltip from '$lib/tooltip';
	
	export let data = {
		name: '',
		previewUrl: '',
		thumbnail: '',
		meta: {
			name: '',
			author: '',
			version: '',
			description: '',
			source: '',
			invite: '',
			donate: '',
			patreon: '',
			website: '',
			authorId: ''
		},
		imports: [''],
		fonts: [''],
		variables: [{
			title: '',
			icon: 'Gear',
			inputs: [templates.inputs.text],
			userModal: false
		}],
		hiddenVars: [{
			variable: '',
			value: '',
			varGroup: '',
			comment: ''
		}],
		varGroups: [],
		addons: []
	}

	interface RemoveTemplate {
		action: 'template',
		prop: string,
		index: number
	}
	interface RemoveInput {
		action: 'input',
		group: number,
		index: number
	}
	const removeRow = (options: (RemoveTemplate|RemoveInput)): void => {
		if (options.action === 'template') {
			const {prop, index} = options;
			data[prop] = data[prop].filter((e: any, i: number) => i !== index);
		}
		if (options.action === 'input') {
			const {group, index} = options;
			data.variables[group].inputs = data.variables[group].inputs.filter((e: any, i: number) => i !== index);
		}
	}

	interface AddTemplate {
		action: 'template',
		prop: string
	}
	interface AddGroup {
		action: 'group'
	}
	interface AddInput {
		action: 'input',
		group: number,
		input: string
	}
	const addRow = (options: (AddTemplate|AddGroup|AddInput)): void => {
		if (options.action === 'template') {
			const {prop} = options;
			data[prop] = [...data[prop], {...templates[prop]}];
			
		} else if (options.action === 'group') {
			data.variables = [...data.variables, {...templates.variables}]

		} else if (options.action === 'input') {
			const {group, input} = options;

			data.variables[group].inputs = [...data.variables[group].inputs, {...templates.inputs[input]}]
		}
	}

	const changeType = (group: number, input: number, newInput: string): void => {
		data.variables[group].inputs[input] = templates.inputs[newInput]
	}

	const submit = async(): Promise<void> => {
		console.log(data);
	}
</script>

<template>
	<form on:submit|preventDefault={submit}>


		<div class="container">
			<div class="input">
				<p class="name">Name</p>
				<Input bind:value={data.name} />
			</div>

			<div class="input">
				<p class="name">Preview URL</p>
				<Input bind:value={data.previewUrl} />
			</div>
			<div class="input">
				<p class="name">Thumbnail</p>
				<Input bind:value={data.thumbnail} />
			</div>
			
			<p class="name">Meta</p>
			<div class="indent">
				{#each Object.keys(data.meta) as key}
					<div class="input">
						<p class="name">{key}</p>
						<Input bind:value={data.meta[key]} />
					</div>
				{/each}
			</div>

			<p class="name">Theme Imports</p>
			<div class="indent">
				{#each data.imports as url, i}
					<div class="input">
						<Input bind:value={url} />
						<div class="btns">
							{#if i !== 0}
								<button type="button" class="remove" on:click={() => removeRow({action: 'template', prop: 'imports', index: i})}>
									<Icon src={XCircle} size="24" />
								</button>
							{/if}
							{#if data.imports.length - 1 === i}
								<button type="button" class="add" on:click={() => addRow({action: 'template', prop: 'imports'})}>
									<Icon src={PlusCircle} size="24" />
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<p class="name">Font Imports</p>
			<div class="indent">
				{#each data.fonts as url, i}
					<div class="input">
						<Input bind:value={url} />
						<div class="btns">
							{#if i !== 0}
								<button type="button" class="remove" on:click={() => removeRow({action: 'template', prop: 'fonts', index: i})}>
									<Icon src={XCircle} size="24" />
								</button>
							{/if}
							{#if data.fonts.length - 1 === i}
								<button type="button" class="add" on:click={() => addRow({action: 'template', prop: 'fonts'})}>
									<Icon src={PlusCircle} size="24" />
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<p class="name">Variables</p>
			<div class="indent">
				{#each data.variables as group, groupIndex}
					<header>
						<p class="name">{group.title || groupIndex}</p>
						<div class="btns">
							{#if groupIndex !== 0}
								<button
									type="button"
									class="remove"
									use:tooltip={{content: 'Remove group'}}
									on:click={() => removeRow({action: 'template', prop: 'variables', index: groupIndex})}
								>
									<Icon src={XCircle} size="24" />
								</button>
							{/if}
							{#if data.variables.length - 1 === groupIndex}
								<button
									type="button"
									class="add"
									use:tooltip={{content: 'Add new group'}}
									on:click={() => addRow({action: 'group'})}
								>
									<Icon src={PlusCircle} size="24" />
								</button>
							{/if}
						</div>
					</header>
					<div class="indent">
						<div class="input">
							<p class="name">Title</p>
							<Input bind:value={group.title} />
						</div>
						<div class="input">
							<p class="name">Icon</p>
							<Select
								long
								options={[
									{label: 'Globle', value: 'Globle', icon: GlobeAlt},
									{label: 'Chat', value: 'Chat', icon: Chat},
									{label: 'Collection', value: 'Collection', icon: Collection},
									{label: 'Colour Swatch', value: 'ColorSwatch', icon: ColorSwatch},
									{label: 'At Symbol', value: 'AtSymbol', icon: AtSymbol},
									{label: 'Cog', value: 'Cog', icon: Cog},
									{label: 'Home', value: 'Home', icon: Home},
									{label: 'Photograph', value: 'Photograph', icon: Photograph},
									{label: 'List', value: 'ViewList', icon: ViewList},
									{label: 'Moon', value: 'Moon', icon: Moon},
									{label: 'User', value: 'User', icon: User},
									{label: 'Status', value: 'StatusOnline', icon: StatusOnline},
									{label: 'Sizing', value: 'Adjustments', icon: Adjustments},
									{label: 'Sun', value: 'Sun', icon: Sun},
								]}
								value="Cog"
								on:update={({detail}) => group.icon = detail}
							/>
						</div>
						<div class="input">
							<p class="name">
								Display user modal
								<span use:tooltip={{content: 'Clicking on the setting will open the User Modal in the previewer.'}}>
									<Icon src={InformationCircle} size="22" />
								</span>
							</p>
							<Select
								long
								options={[
									{label: 'True', value: true},
									{label: 'False', value: false}
								]}
								value={false}
								on:update={({detail}) => group.userModal = detail}
							/>
						</div>
	
						<p class="name">Inputs</p>
						<div class="indent">
							{#each group.inputs as input, inputIndex}
								<header>
									<p class="name">{group.title || groupIndex} - {inputIndex}</p>
									<div class="btns">
										{#if inputIndex !== 0}
											<button
												type="button"
												class="remove"
												use:tooltip={{content: 'Remove input'}}
												on:click={() => removeRow({action: 'input', group: groupIndex, index: inputIndex})}
											>
												<Icon src={XCircle} size="24" />
											</button>
										{/if}
										{#if group.inputs.length - 1 === inputIndex}
											<button
												type="button"
												class="add"
												use:tooltip={{content: 'Add new input'}}
												on:click={() => addRow({action: 'input', group: groupIndex, input: 'text'})}
											>
												<Icon src={PlusCircle} size="24" />
											</button>
										{/if}
									</div>
								</header>
								<div class="indent">
									<div class="input">
										<p class="name">Type</p>
										<Select
											long
											options={[
												{label: 'Colour', value: 'colour'},
												{label: 'Image', value: 'image'},
												{label: 'Text', value: 'text'}
											]}
											value={input.type}
											on:update={({detail}) => changeType(groupIndex, inputIndex, detail)}
										/>
									</div>
									<div class="input">
										<p class="name">
											Var Group
											<span use:tooltip={{content: 'Var Group is where the variable should be placed in the downloaded file. Leaving this blank will default to :root.'}}>
												<Icon src={InformationCircle} size="22" />
											</span>
										</p>
										<Input bind:value={input.varGroup} />
									</div>
									<p class="name">Details</p>
									<div class="indent">
										{#each Object.entries(input.details) as [key, value]}
											<div class="input">
												<p class="name">
													{key}
													{#if key === 'comment'}
														<span use:tooltip={{content: 'Comment to be placed next to the variable in the downloaded file.'}}>
															<Icon src={InformationCircle} size="22" />
														</span>
													{/if}
												</p>
												{#if typeof value === 'boolean'}
													<Select
														long
														options={[
															{label: 'True', value: true},
															{label: 'False', value: false}
														]}
														value={value}
														on:update={({detail}) => input.details[key] = detail}
													/>
												{:else if key === 'type' && input.type === 'colour'}
													<Select
														long
														options={[
															{label: 'HEX', value: 'HEX'},
															{label: 'RGB', value: 'RGB'},
															{label: 'HSL', value: 'HSL'}
														]}
														value={value}
														on:update={({detail}) => input.details[key] = detail}
													/>	
												{:else}
													<Input bind:value={input.details[key]} />
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			
			<p class="name">
				Hidden Variables
				<span use:tooltip={{content: 'Hidden variables are variables that should not be edited by the user but need to incuded in the downloaded file. Example: version variable.'}}>
					<Icon src={InformationCircle} size="22" />
				</span>
			</p>
			<div class="indent">
				{#each data.hiddenVars as hidden, hiddenIndex}
					<header>
						<p class="name">{hiddenIndex}</p>
						<div class="btns">
							{#if hiddenIndex !== 0}
								<button
									type="button"
									class="remove"
									use:tooltip={{content: 'Remove input'}}
									on:click={() => removeRow({action: 'template', prop: 'hiddenVars', index: hiddenIndex})}
								>
									<Icon src={XCircle} size="24" />
								</button>
							{/if}
							{#if data.hiddenVars.length - 1 === hiddenIndex}
								<button
									type="button"
									class="add"
									use:tooltip={{content: 'Add new input'}}
									on:click={() => addRow({action: 'template', prop: 'hiddenVars'})}
								>
									<Icon src={PlusCircle} size="24" />
								</button>
							{/if}
						</div>
					</header>
					<div class="indent">
						<div class="input">
							<p class="name">Variable</p>
							<Input bind:value={hidden.variable} />
						</div>
						<div class="input">
							<p class="name">Value</p>
							<Input bind:value={hidden.value} />
						</div>
						<div class="input">
							<p class="name">Var Group</p>
							<Input bind:value={hidden.varGroup} />
						</div>
						<div class="input">
							<p class="name">Comment</p>
							<Input bind:value={hidden.comment} />
						</div>
					</div>
				{/each}
			</div>

		</div>
		<button type="submit">submit</button>
	</form>
</template>

<style lang="scss">
	.indent {
		padding-left: 45px;
		position: relative;
		&::before {
			content: "";
			position: absolute;
			left: 22px;
			height: 100%;
			width: 2px;
			background: var(--spine);
		}
		&:hover {
			&::before {
				background: var(--spine-hover);
			}
			& > .input .name,
			& > .name {
				color: var(--text-primary);
				font-style: italic;
			}
		}
	}
	.input {
		display: flex;
		align-items: center;
		& + .input {
			margin-top: 6px;
		}
	}
	header {
		display: flex;
		align-items: center;
	}
	.name {
		white-space: nowrap;
		height: 38px;
		display: flex;
		align-items: center;
		span {
			display: flex;
			margin-left: 4px;
			color: var(--text-tertiary);
		}
		&::after {
			content: "=";
			margin: 0 12px;
		}
	}

	.btns {
		display: flex;
		button {
			margin-left: 8px;
		}
		&:empty {
			display: none;
		}
	}
	.add {
		color: hsl(var(--green));
	}
	.remove {
		color: hsl(var(--red));
	}
</style>