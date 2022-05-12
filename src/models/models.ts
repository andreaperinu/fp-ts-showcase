export interface IBreed {
	breed: string
	subBreeds: string[]
}

export interface IResponse<T> {
	message?: T
	status: string
}

export type IBreedResponseMessage = {
	[breed: string]: string[]
}
