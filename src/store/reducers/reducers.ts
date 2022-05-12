import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';

import axios from '@/axios';
import { IBreedResponseMessage, IResponse } from '@/models/models';
import { BreedPayload } from '@/store/actions/actions';
import { IStoreState, StoreReducer, TypedStoreReducer } from '@/store/types';
import { formatBreeds } from '@/utils/utils';

const tryApi = <T>(url: string) => pipe(
	TE.tryCatch(() => axios.get<IResponse<T>>(url), (reason: unknown) => (reason as Error).message),
	TE.map(({ data }) => data)
)()

const left = (error: string): Partial<IStoreState> => ({ maybeError: O.some(error) })

const fetchBreeds: StoreReducer = async () => {
	const eitherState = await tryApi<IBreedResponseMessage>('breeds/list/all')

	const right = ({ message }: IResponse<IBreedResponseMessage>): Partial<IStoreState> => ({
		maybeBreeds: pipe(message, O.fromNullable, O.map(formatBreeds))
	})

	return pipe(eitherState, E.fold(left, right))
}

const fetchRandomImage: TypedStoreReducer<BreedPayload> = async (_, { breed }) => {
	const eitherState = await tryApi<string>(`breed/${breed}/images/random`)

	const right = ({ message }: IResponse<string>): Partial<IStoreState> => ({
		maybeRandomImage: pipe(message, O.fromNullable)
	})

	return pipe(eitherState, E.fold(left, right))
}

const fetchImages: TypedStoreReducer<BreedPayload> = async (_, { breed }) => {
	const eitherState = await tryApi<string[]>(`breed/${breed}/images`)

	const right = ({ message }: IResponse<string[]>): Partial<IStoreState> => ({
		maybeImages: pipe(message, O.fromNullable)
	})

	return pipe(eitherState, E.fold(left, right))
}

const resetRandomImage: StoreReducer = async () => ({ maybeRandomImage: O.none })
const resetImages: StoreReducer = async () => ({ maybeImages: O.none })

export const reducers = { fetchBreeds, fetchRandomImage, resetRandomImage, fetchImages, resetImages }
