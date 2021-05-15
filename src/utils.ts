import {DataPoint, GarbageTypeColors, MapViewBounds} from '@/store/store'
import * as atlas from 'azure-maps-control'

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

	const lonBottomLeftCheck = newBounds.lonBottomLeft >= (loadedBounds.lonBottomLeft - 0.0001)
	const latBottomLeftCheck = newBounds.latBottomLeft >= (loadedBounds.latBottomLeft - 0.0001)
	const lonTopRightCheck = newBounds.lonTopRight <= (loadedBounds.lonTopRight + 0.0001)
	const latTopRightCheck = newBounds.latTopRight <= (loadedBounds.latTopRight + 0.0001)

	return lonBottomLeftCheck && latBottomLeftCheck && lonTopRightCheck && latTopRightCheck
}

export const isPointWithinBounds = (mapViewBounds: MapViewBounds, point: DataPoint): boolean => {
	const lonBottomLeftCheck = point.lon >= (mapViewBounds.lonBottomLeft - 0.0001)
	const latBottomLeftCheck = point.lat >= (mapViewBounds.latBottomLeft - 0.0001)
	const lonTopRightCheck = point.lon <= (mapViewBounds.lonTopRight + 0.0001)
	const latTopRightCheck = point.lat <= (mapViewBounds.latTopRight + 0.0001)

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
