import { ActionContext } from 'vuex'
import {MapChangePayload, StateRoot} from '@/store/store'
import {isWithinBounds} from '@/utils'
import {loadPoints} from '@/http'

type A = ActionContext<StateRoot, StateRoot>

export const processMarkers = (context: A, payload: MapChangePayload) => {
	const boundCheck = isWithinBounds(context.state.loadedBounds, payload.bounds)
	if (!boundCheck) {
		context.commit('SET_BOUNDS', payload.bounds)
		loadPoints(payload.bounds).then(points => {
			context.commit('SET_POINTS', points)
		})
	}
}
