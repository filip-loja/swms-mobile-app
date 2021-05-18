import { DataPoint, MapViewBounds } from '@/store/store'
// TODO remove mock import when not needed
// @ts-ignore
import mockPoints from './points-mock.json'
import { isPointWithinBounds } from '@/utils'
import { apiManager } from '@/main'

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
	return apiManager.get(`bin/fullness/${id}`)
		.then(resp => resp.data.data)
		.catch(err => {
			console.log(err);
			return Promise.reject(err)
		})
}

export const sendProblemReport = (id: any, message: string): Promise<any> => {
	return apiManager.post('bin/report', { id, message })
		.then(resp => resp.data)
		.catch(err => {
			console.log(err);
			return Promise.reject(err)
		})
}
