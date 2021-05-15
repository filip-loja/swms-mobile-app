
import {DataPoint, StateRoot, TypeGarbage} from '@/store/store'

export const garbageTypes = (state: StateRoot): TypeGarbage[] => {
	return Object.keys(state.garbageTypeDefs) as TypeGarbage[]
}

export const activePoints = (state: StateRoot): DataPoint[] => {
	return state.loadedPoints.filter((point: DataPoint) => {
		let filterCheck: boolean
		if (state.filteredGarbageTypes.length) {
			filterCheck = state.filteredGarbageTypes.includes(point.type)
		} else {
			filterCheck = true
		}
		return filterCheck
	})
}
