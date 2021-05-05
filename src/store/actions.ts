import { ActionContext } from 'vuex'
import {StateRoot} from '@/store/store'

type A = ActionContext<StateRoot, StateRoot>

export const sampleAction = () => {
	//
}
