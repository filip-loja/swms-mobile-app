import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { StateRoot } from '@/store/store'
import { state } from '@/store/state'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'
import * as getters from '@/store/getters'

export const key: InjectionKey<Store<StateRoot>> = Symbol()
export function useStore () {
	return baseUseStore(key)
}

const store = createStore<StateRoot>({
	state,
	mutations,
	actions,
	getters,
})

export default store
