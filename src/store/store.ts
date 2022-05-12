import * as A from 'fp-ts/lib/Array';
import * as B from 'fp-ts/lib/boolean';
import { constVoid, pipe as pipeF } from 'fp-ts/lib/function';
import * as I from 'fp-ts/lib/Identity';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { useCallback, useEffect, useState } from 'react';

import { BreedPayload } from '@/store/actions/actions';
import * as ACTIONS from '@/store/actions/rawActions';
import { reducers } from '@/store/reducers/reducers';
import { IStoreState, StoreAction, StoreDispatch } from '@/store/types';

let state: Readonly<IStoreState> = {
	maybeBreeds: O.none,
	maybeError: O.none,
	maybeRandomImage: O.none,
	maybeImages: O.none,
}

let listeners: React.Dispatch<React.SetStateAction<IStoreState>>[] = []

const { fetchBreeds, fetchRandomImage, resetRandomImage, fetchImages, resetImages } = reducers

const updatedState: StoreAction = async (type, payload) => {
	switch (type) {
		case ACTIONS.FETCH_BREEDS: return await fetchBreeds(state)
		case ACTIONS.FETCH_RANDOM_IMAGE: return await fetchRandomImage(state, payload as BreedPayload)
		case ACTIONS.RESET_RANDOM_IMAGE: return await resetRandomImage(state)
		case ACTIONS.RESET_IMAGES: return await resetImages(state)
		case ACTIONS.FETCH_IMAGES: return await fetchImages(state, payload as BreedPayload)
		default: return state
	}
}

export const useStore = (shouldListen = true): [IStoreState, StoreDispatch] => {
	const setState = useState(state)[1]

	const dispatch: StoreDispatch = async ({ type, payload }) => {
		const newState = await updatedState(type, payload)
		state = { ...state, ...newState }

		for (const listener of listeners) listener(state)
	}

	const listenerFilter = useCallback((listener: React.Dispatch<React.SetStateAction<IStoreState>>): boolean => (
		listener !== setState
	), [setState])

	useEffect(() => {
		pipeF(shouldListen, B.fold(constVoid, () => listeners.push(setState)))

		return () => {
			listeners = pipe(
				shouldListen,
				O.fromPredicate(I.of),
				O.map(() => pipeF(listeners, A.filter(listenerFilter))),
				O.getOrElse(() => listeners),
			)
		}
	}, [setState, shouldListen])

	return [state, useCallback(dispatch, [])]
}
