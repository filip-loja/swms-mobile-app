import { DataPoint, MapViewBounds, TypeGarbage } from '@/store/store'
import { apiManager } from '@/main'

export const loadPoints = (mapViewBounds: MapViewBounds): Promise<DataPoint[]> => {
	const payload = {
		status: 'enabled',
		location: mapViewBounds
	}
	return apiManager.post('bin/list', payload)
		.then(resp => resp.data.data.items)
		.catch(err => {
			console.log(err)
			return Promise.reject(err)
		})
}

export const loadFullness = (id: any): Promise<number> => {
	return apiManager.get(`bin/fullness/${id}`)
		.then(resp => resp.data.data)
		.catch(err => {
			console.log(err)
			return Promise.reject(err)
		})
}

export const sendProblemReport = (id: any, type: TypeGarbage, message: string): Promise<any> => {
	return apiManager.post('bin/report', { id, type, message })
		.then(resp => resp.data)
		.catch(err => {
			console.log(err)
			return Promise.reject(err)
		})
}
