import {DataPoint, MapViewBounds} from '@/store/store'
// @ts-ignore
import mockPoints from './points-mock.json'
import {isPointWithinBounds} from '@/utils'

export const loadPoints = (mapViewBounds: MapViewBounds): Promise<DataPoint[]> => {
	// TODO implement
	return new Promise(resolve => {
		const result = (mockPoints as DataPoint[]).filter((point: DataPoint) => isPointWithinBounds(mapViewBounds, point))
		setTimeout(() => {
			resolve(result)
		}, 500)
	})
}

export const loadFullness = (id: any): Promise<number> => {
	// TODO implement
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Math.random() * 100)
		}, 500)
	})
}

export const sendProblemReport = (id: any, message: string): void => {
	// TODO implement
}
