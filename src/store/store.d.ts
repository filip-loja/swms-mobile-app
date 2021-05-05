
export type TypeGarbage = 'plastic' | 'paper' | 'glass' | 'metal' | 'mixed'

export interface StateRoot {
	azureKey: string;
	garbageTypeDefs: GarbageTypeDef;
	filteredGarbageTypes: TypeGarbage[];
}

export interface GarbageTypeDef {
	[key: TypeGarbage]: string;
}
