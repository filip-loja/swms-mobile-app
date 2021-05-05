
import { StateRoot } from '@/store/store'

export const state: StateRoot = {
	garbageTypeDefs: {
		'plastic': 'bin-icons/plastic.png',
		'paper': 'bin-icons/paper.png',
		'glass': 'bin-icons/glass.png',
		'metal': 'bin-icons/metal.png',
		'mixed': 'bin-icons/mixed.png',
	},
	filteredGarbageTypes: [],
	test: 'hello'
}
