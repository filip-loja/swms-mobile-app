
export type TypeGarbage = 'plastic' | 'paper' | 'glass' | 'metal' | 'mixed'

export interface StateRoot {
	azureKey: string;
	defaultCamera: any;
	garbageTypeDefs: GarbageTypeDef;
	garbageTypeColors: GarbageTypeColors;
	filteredGarbageTypes: TypeGarbage[];
	loadedPoints: DataPoint[];
}

export interface GarbageTypeDef {
	[key: TypeGarbage]: string;
}

export interface GarbageTypeColors {
	[key: TypeGarbage]: string;
}

export interface DataPoint {
	id: any;
	lon: number;
	lat: number;
	type: TypeGarbage;
}

export interface MapViewBounds {
	lonBottomLeft: number;
	latBottomLeft: number;
	lonTopRight: number;
	latTopRight: number;
}

export interface MapChangePayload {
	zoom?: number;
	bounds: MapViewBounds;
}
