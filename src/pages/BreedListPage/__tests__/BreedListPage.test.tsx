import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';

import { IBreed } from '@/models/models';
import { BreedPayload } from '@/store/actions/actions';
import { FETCH_IMAGES } from '@/store/actions/rawActions';
import { IStoreState } from '@/store/types';
import * as mockedBreeds from '@/tests/mockedBreeds.json';
import { setup } from '@/tests/utils';
import { formatBreeds } from '@/utils/utils';

import component from '../BreedListPage';

const dispatch = jest.fn()

const maybeBreeds: O.Option<IBreed[]> = pipe(
	mockedBreeds,
	formatBreeds,
	O.fromNullable,
)

const initialState: Partial<IStoreState> = {
	maybeBreeds: O.none,
	maybeImages: O.none,
}

const maybeSelectedBreed: O.Option<IBreed> = pipe(maybeBreeds, O.chain(A.head))

describe('<BreedListPage />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props: {} })
		expect(wrapper).toMatchSnapshot()
	})

	it('should dispatch fetch images', () => {
		const payload: BreedPayload = {
			breed: pipe(maybeSelectedBreed, O.map(({ breed }) => breed), O.getOrElse(() => ''))
		}

		jest.spyOn(React, 'useState').mockImplementation(() => [maybeSelectedBreed, jest.fn()])

		setup({ component, props: {}, initialState, dispatch, shouldMount: true, })

		expect(dispatch).toHaveBeenCalledWith({ payload, type: FETCH_IMAGES })
	})
})
