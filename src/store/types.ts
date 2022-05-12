import * as O from 'fp-ts/lib/Option';

import { IBreed } from '@/models/models';

import * as A from './actions/rawActions';

type ActionType = keyof typeof A

export interface IStoreState {
	maybeBreeds: O.Option<IBreed[]>,
	maybeRandomImage: O.Option<string>,
	maybeError: O.Option<string>,
	maybeImages: O.Option<string[]>
}

export type StoreAction = (type: ActionType, payload: unknown) => Promise<Partial<IStoreState>>

export type StoreReducer = (state: IStoreState) => Promise<Partial<IStoreState>>
export type TypedStoreReducer<T> = (state: IStoreState, payload: T) => Promise<Partial<IStoreState>>

export type StoreDispatch = ({ type, payload }: { type: ActionType, payload?: unknown }) => void

export type Action<P = undefined> = (payload?: P) => ({ type: ActionType, payload?: P })
