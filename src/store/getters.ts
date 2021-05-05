
import { StateRoot, TypeGarbage } from '@/store/store'

export const garbageTypes = (state: StateRoot): TypeGarbage[] => {
	return Object.keys(state.garbageTypeDefs) as TypeGarbage[]
}
