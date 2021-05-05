
export type TypeGarbage = 'plastic' | 'paper' | 'glass' | 'metal' | 'mixed'

export interface StateRoot {
	garbageTypeDefs: GarbageTypeDef;
	filteredGarbageTypes: TypeGarbage[];
	test: string;
}

export interface GarbageTypeDef {
	[key: TypeGarbage]: string;
}
