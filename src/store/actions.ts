import { ActionContext } from 'vuex'
import {MapChangePayload, StateRoot} from '@/store/store'
import {isWithinBounds} from '@/utils'

type A = ActionContext<StateRoot, StateRoot>

export const processMarkers = (context: A, payload: MapChangePayload) => {
	const boundCheck = isWithinBounds(context.state.loadedBounds, payload.bounds)
	console.log(boundCheck)
	if (!boundCheck) {
		context.commit('SET_BOUNDS', payload.bounds)
		// TODO api request for new data
		console.log('REQUEST')
	}
}
