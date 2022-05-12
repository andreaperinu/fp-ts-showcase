import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';

import { IBreed } from '@/models/models';
import { BreedPayload } from '@/store/actions/actions';
import { FETCH_RANDOM_IMAGE } from '@/store/actions/rawActions';
import { IStoreState } from '@/store/types';
import * as mockedBreeds from '@/tests/mockedBreeds.json';
import { setup } from '@/tests/utils';
import { formatBreeds } from '@/utils/utils';

import component from '../BreedRandomPage';

const dispatch = jest.fn()
const useState = jest.fn()

const mockedMaybeBreed: O.Option<IBreed> = pipe(
	mockedBreeds,
	formatBreeds,
	A.head,
)

const initialState: Partial<IStoreState> = {
	maybeBreeds: O.none,
	maybeRandomImage: O.none,
}

beforeEach(() => {
	dispatch.mockClear()
	useState.mockClear()
})

describe('<BreedRandomPage />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props: {}, initialState })
		expect(wrapper).toMatchSnapshot()
	})

	it('should match snapshot (breeds)', () => {
		const state: Partial<IStoreState> = {
			maybeBreeds: O.some(formatBreeds(mockedBreeds)),
		}
		const wrapper = setup({ component, props: {}, initialState, state })
		expect(wrapper).toMatchSnapshot()
	})

	it('should match snapshot (image)', () => {
		const state: Partial<IStoreState> = {
			maybeRandomImage: O.some('url'),
		}
		const wrapper = setup({ component, props: {}, initialState, state })
		expect(wrapper).toMatchSnapshot()
	})

	it('should dispatch fetch random image', () => {
		const payload: BreedPayload = {
			breed: pipe(mockedMaybeBreed, O.map(({ breed }) => breed), O.getOrElse(() => ''))
		}

		jest.spyOn(React, 'useState').mockImplementation(() => [mockedMaybeBreed, jest.fn()])

		setup({ component, props: {}, initialState, dispatch, shouldMount: true, })

		expect(dispatch).toHaveBeenCalledWith({ payload, type: FETCH_RANDOM_IMAGE })
	})
})
