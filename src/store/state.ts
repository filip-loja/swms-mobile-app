
import { StateRoot } from '@/store/store'
import * as atlas from 'azure-maps-control'

export const state: StateRoot = {
	azureKey: 'mn3NIsmVQt6m9sAHmQiPZUj_3u8Dp4wX9orZhXYICG0',
	defaultCamera: {
		center: [18.620, 48.771],
		maxBounds: new atlas.data.BoundingBox([18.591718, 48.759056], [18.652761, 48.792376])
	},
	loadedBounds: null,
	garbageTypeDefs: {
		'plastic': 'bin-icons/plastic.png',
		'paper': 'bin-icons/paper.png',
		'glass': 'bin-icons/glass.png',
		'metal': 'bin-icons/metal.png',
		'mixed': 'bin-icons/mixed.png',
	},
	garbageTypeColors: {
		'plastic': '#FECA18',
		'paper': '#13A8E1',
		'glass': '#75B73B',
		'metal': '#E61C29',
		'mixed': '#4E4C4A',
	},
	filteredGarbageTypes: [],
	loadedPoints: [],
	// loadedPoints: [
	// 	{id: 1, lon: 18.620, lat: 48.771, type: 'plastic'},
	// 	{id: 2, lon: 18.621111, lat: 48.771, type: 'paper'}
	// ]
}
