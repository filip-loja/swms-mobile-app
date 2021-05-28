
export type TypeGarbage = 'plastic' | 'paper' | 'glass' | 'metal' | 'mixed'

export interface StateRoot {
	azureKey: string;
	defaultCamera: any;
	loadedBounds: MapViewBounds | null;
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
	binId: any;
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
