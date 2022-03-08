<script lang="ts">
	import {Icon} from '@steeze-ui/svelte-icon';
	import {InformationCircle, Moon, Home, Sun, User, Photograph, ViewList, StatusOnline, Adjustments, Cog, AtSymbol, ColorSwatch, GlobeAlt, Chat, Collection} from '@steeze-ui/heroicons';
	import {Input, Select} from '$components/common';
	import {templates} from './templates';
	import tooltip from '$lib/tooltip';
	import api from '$lib/api';
	import {clone} from '$lib/helpers';

	import {Button} from '$components/common';
	import Btns from './Btns.svelte';
	
	export let editing: boolean = false;
	export let data = {
		name: 'SoftX',
		previewUrl: 'https://discordstyles.github.io/SoftX/SoftX.theme.css',
		thumbnail: 'https://camo.githubusercontent.com/6806907a0313ec99a80fe2ead0d275570332a3d8b36287f9b97b6529543877ab/68747470733a2f2f692e696d6775722e636f6d2f4535376746334c2e706e67',
		meta: {
			name: 'SoftX',
			author: 'Gibbu#1211',
			version: '1.0.0',
			description: 'A soft and comfy feel for Discord.',
			source: 'https://github.com/DiscordStyles/SoftX',
			invite: 'ZHthyCw',
			donate: '',
			patreon: '',
			website: '',
			authorId: '174868361040232448'
		},
		imports: [
			'https://discordstyles.github.io/SoftX/SoftX.css',
			'https://discordstyles.github.io/SoftX/RadialGlow.css',
			'https://discordstyles.github.io/SoftX/VerticalUserArea.css',
			'https://discordstyles.github.io/Addons/windows-titlebar.css'
		],
		fonts: [''],
		variables: [{
			title: '',
			icon: 'Gear',
			inputs: [{...templates.inputs.image}],
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
	interface RemoveOption {
		action: 'option',
		group: number,
		input: number,
		option: number
	}
	const removeRow = (options: (RemoveTemplate|RemoveInput|RemoveOption)): void => {
		if (options.action === 'template') {
			const {prop, index} = options;
			data[prop] = data[prop].filter((e: any, i: number) => i !== index);
		} else if (options.action === 'input') {
			const {group, index} = options;
			data.variables[group].inputs = data.variables[group].inputs.filter((e: any, i: number) => i !== index);
		} else if (options.action === 'option') {
			const {group, input, option} = options;
			// @ts-ignore
			data.variables[group].inputs[input].details.options = data.variables[group].inputs[input].details.options.filter((e: any, i: number) => i !== option)
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
	interface AddOption {
		action: 'option',
		group: number,
		input: number
	}
	const addRow = (options: (AddTemplate|AddGroup|AddInput|AddOption)): void => {
		if (options.action === 'template') {
			const {prop} = options;
			const newProp = typeof templates[prop] === 'string' ? '' : clone(templates[prop])
			data[prop] = [...data[prop], newProp];
		} else if (options.action === 'group') {
			data.variables = [...data.variables, clone(templates.variables)]
		} else if (options.action === 'input') {
			const {group, input} = options;
			data.variables[group].inputs = [...data.variables[group].inputs, clone(templates.inputs[input])]
		} else if (options.action === 'option') {
			const {group, input} = options;
			// @ts-ignore
			data.variables[group].inputs[input].details.options = [...data.variables[group].inputs[input].details.options, {label: '', value: ''}]
		}
	}

	const changeType = (group: number, input: number, newInput: string): void => {
		data.variables[group].inputs[input] = templates.inputs[newInput]
	}

	const submit = async(): Promise<void> => {
		// console.log(data);
		if (editing) {
			
		} else {
			const {status, errors} = await api.post('/dev/addtheme.json', {data})

			if (status === 200) {
				console.log('yes!!!!!!!');
				return;
			}

			console.log('no :(');

		}
	}
</script>

<template>
	<form on:submit|preventDefault={submit}>

		<main class="container">
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
						<Btns
							index={i}
							array={data.imports}
							type="import"
							on:add={() => addRow({action: 'template', prop: 'imports'})}
							on:remove={() => removeRow({action: 'template', prop: 'imports', index: i})}
						/>
					</div>
				{/each}
			</div>

			<p class="name">Font Imports</p>
			<div class="indent">
				{#each data.fonts as url, i}
					<div class="input">
						<Input bind:value={url} />
						<Btns
							index={i}
							array={data.imports}
							type="import"
							on:add={() => addRow({action: 'template', prop: 'imports'})}
							on:remove={() => removeRow({action: 'template', prop: 'imports', index: i})}
						/>
					</div>
				{/each}
			</div>

			<p class="name">Variables</p>
			<div class="indent">
				{#each data.variables as group, groupIndex}
					<header>
						<p class="name">{group.title || groupIndex}</p>
						<Btns
							index={groupIndex}
							array={data.variables}
							type="group"
							on:add={() => addRow({action: 'group'})}
							on:remove={() => removeRow({action: 'template', prop: 'variables', index: groupIndex})}
						/>
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
									<Btns
										index={inputIndex}
										array={group.inputs}
										type="input"
										on:add={() => addRow({action: 'input', group: groupIndex, input: 'image'})}
										on:remove={() => removeRow({action: 'input', group: groupIndex, index: inputIndex})}
									/>
								</header>
								<div class="indent">
									<div class="input">
										<p class="name">Type</p>
										<Select
											long
											options={[
												{label: 'Colour', value: 'colour'},
												{label: 'Font', value: 'font'},
												{label: 'Image', value: 'image'},
												{label: 'Number', value: 'number'},
												{label: 'Select', value: 'select'},
												{label: 'Slider', value: 'slider'},
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
												{:else if typeof value === 'number'}
													<Input inputType="number" bind:value={input.details[key]} />
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
												{:else if key !== 'options'}
													<Input bind:value={input.details[key]} />
												{/if}
											</div>
											{#if key === 'options'}
												<div class="indent">
													{#each value as option, optionIndex}
														<header>
															<p class="name">{optionIndex}</p>
															<Btns
																index={optionIndex}
																array={value}
																type="option"
																on:add={() => addRow({action: 'option', group: groupIndex, input: inputIndex})}
																on:remove={() => removeRow({action: 'option', group: groupIndex, input: inputIndex, option: optionIndex})}
															/>
														</header>
														<div class="indent">
															{#each Object.keys(option) as key}
																<div class="input">
																	<p class="name">{key}</p>
																	<Input bind:value={option[key]} />
																</div>
															{/each}
														</div>
													{/each}
												</div>
											{/if}
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
						<Btns
							index={hiddenIndex}
							array={data.hiddenVars}
							type="hidden variable"
							on:add={() => addRow({action: 'template', prop: 'hiddenVars'})}
							on:remove={() => removeRow({action: 'template', prop: 'hiddenVars', index: hiddenIndex})}
						/>
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
		</main>
		
		<footer class="footer">
			<Button style="primary" type="submit">Submit</Button>
		</footer>
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
		& + .input {
			margin-top: 6px;
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

	.footer {
		margin-top: 36px;
	}
</style>