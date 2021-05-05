
import { StateRoot, TypeGarbage } from '@/store/store'

export const SET_FILTER = (state: StateRoot, payload: TypeGarbage) => {
	if (payload === null) {
		state.filteredGarbageTypes = []
	} else {
		const index = state.filteredGarbageTypes.findIndex(item => item === payload)
		if (index === -1) {
			state.filteredGarbageTypes.push(payload)
		} else {
			state.filteredGarbageTypes.splice(index, 1)
		}
	}
}
