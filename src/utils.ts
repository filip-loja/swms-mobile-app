
export const capitalize = (str: string): string => {
	const first = str.charAt(0).toUpperCase()
	return first + str.slice(1)
}

export const loadFullness = (id: any): Promise<number> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Math.random() * 100)
		}, 500)
	})
}
