import {DataPoint, GarbageTypeColors, MapViewBounds} from '@/store/store'
import * as atlas from 'azure-maps-control'

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

export const capitalize = (str: string): string => {
	const first = str.charAt(0).toUpperCase()
	return first + str.slice(1)
}

export const createMapViewBounds = (rawBounds: any): MapViewBounds => {
	return {
		lonBottomLeft: rawBounds[0],
		latBottomLeft: rawBounds[1],
		lonTopRight: rawBounds[2],
		latTopRight: rawBounds[3]
	}
}

export const isWithinBounds = (loadedBounds: MapViewBounds | null, newBounds: MapViewBounds): boolean => {
	if (loadedBounds === null) return false

	const lonBottomLeftCheck = newBounds.lonBottomLeft >= loadedBounds.lonBottomLeft
	const latBottomLeftCheck = newBounds.latBottomLeft >= loadedBounds.latBottomLeft
	const lonTopRightCheck = newBounds.lonTopRight <= loadedBounds.lonTopRight
	const latTopRightCheck = newBounds.latTopRight <= loadedBounds.latTopRight

	return lonBottomLeftCheck && latBottomLeftCheck && lonTopRightCheck && latTopRightCheck
}

export const generateMarkers = (points: DataPoint[], colors: GarbageTypeColors): any => {
	return points.map((point: DataPoint) => {
		const marker = new atlas.HtmlMarker({
			// @ts-ignore
			color: colors[point.type],
			position: [point.lon, point.lat]
		})
		// @ts-ignore
		marker['properties'] = point
		return marker
	})
}
