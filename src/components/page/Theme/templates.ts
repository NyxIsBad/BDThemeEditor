const inputs = {
	colour: {
		type: 'colour',
		varGroup: '',
		details: {
			variable: '',
			title: '',
			type: 'RGB',
			alpha: false,
			rule: false,
			hint: '',
			comment: ''
		}
	},
	font: {
		type: 'font',
		varGroup: '',
		details: {
			variable: '',
			title: '',
			index: 0,
			value: '',
			hint: '',
			comment: ''
		}
	},
	image: {
		type: 'image',
		varGroup: '',
		details: {
			variable: '',
			title: '',
			start: '',
			value: '',
			hint: '',
			comment: ''
		}
	},
	number: {
		type: 'number',
		varGroup: '',
		details: {
			variable: '',
			value: 0,
			title: '',
			unit: '',
			hint: '',
			min: 0,
			max: 0,
			step: 0,
			comment: ''
		}
	},
	select: {
		type: 'select',
		varGroup: '',
		details: {
			value: '',
			variable: '',
			title: '',
			options: [{
				label: '',
				value: ''
			}],
			hint: '',
			customValue: false,
			comment: ''
		}
	},
	slider: {
		type: 'slider',
		varGroup: '',
		details: {
			value: 0,
			max: 0,
			variable: '',
			title: '',
			step: 0,
			hint: '',
			min: 0,
			unit: '',
			comment: ''
		}
	},
	text: {
		type: 'text',
		varGroup: '',
		details: {
			variable: '',
			title: '',
			value: '',
			hint: '',
			comment: ''
		}
	}
}

export const templates = {
	imports: '',
	fonts: '',
	variables: {
		title: '',
		icon: '',
		inputs: [inputs.text],
		userModal: false,
	},
	inputs,
	hiddenVars: {
		variable: '',
		value: '',
		varGroup: '',
		comment: ''
	}
}