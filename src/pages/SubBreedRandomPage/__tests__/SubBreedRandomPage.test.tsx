import { sequenceT } from 'fp-ts/lib/Apply';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';

import { BreedSelector } from '@/components/BreedSelector/BreedSelector';
import { IBreed } from '@/models/models';
import { BreedPayload } from '@/store/actions/actions';
import { FETCH_RANDOM_IMAGE, RESET_RANDOM_IMAGE } from '@/store/actions/rawActions';
import { IStoreState } from '@/store/types';
import * as mockedBreeds from '@/tests/mockedBreeds.json';
import { setup } from '@/tests/utils';
import { formatBreeds } from '@/utils/utils';

import component from '../SubBreedRandomPage';

const dispatch = jest.fn()
const useState = jest.fn()

const maybeSelectedBreed: O.Option<IBreed> = pipe(
	mockedBreeds,
	formatBreeds,
	A.head,
)

const props = {}

const maybeSelectedSubBreed: O.Option<string> = O.some('sub-breed')

const initialState: Partial<IStoreState> = {
	maybeBreeds: O.none,
	maybeRandomImage: O.none,
}

beforeEach(() => {
	useState.mockClear()
	dispatch.mockClear()
})

describe('<SubBreedRandomPage />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props, initialState, shouldMount: true, })
		expect(wrapper).toMatchSnapshot()
	})

	it('should match snapshot (breeds)', () => {
		const state: Partial<IStoreState> = {
			maybeBreeds: O.some(formatBreeds(mockedBreeds)),
		}
		const wrapper = setup({ component, props, initialState, state })
		expect(wrapper).toMatchSnapshot()
	})

	it('should match snapshot (image)', () => {
		const state: Partial<IStoreState> = {
			maybeRandomImage: O.some('url'),
		}
		const wrapper = setup({ component, props, initialState, state })
		expect(wrapper).toMatchSnapshot()
	})

	it('should dispatch fetch images', () => {
		jest.spyOn(React, 'useState')
			.mockImplementationOnce(() => [maybeSelectedBreed, jest.fn()])
			.mockImplementationOnce(() => [maybeSelectedSubBreed, jest.fn()])

		const payload: BreedPayload = {
			breed: pipe(
				sequenceT(O.option)(maybeSelectedBreed, maybeSelectedSubBreed),
				O.fold(() => '', ([{ breed }, subBreed]) => `${breed}/${subBreed}`)
			)
		}

		setup({ component, props, initialState, dispatch, shouldMount: true, })

		expect(dispatch).toHaveBeenCalledWith({ payload, type: FETCH_RANDOM_IMAGE })
	})

	it('should set breed', () => {
		jest.spyOn(React, 'useState')
			.mockImplementationOnce(init => [init, useState])
			.mockImplementation(init => [init, jest.fn()])

		const wrapper = setup({ component, props, initialState })
		const breedSelector = wrapper.find(BreedSelector)

		breedSelector?.simulate('change', maybeSelectedBreed)

		expect(useState).toHaveBeenCalledWith(maybeSelectedBreed)
	})

	it('should reset sub-breed', () => {
		jest.spyOn(React, 'useState')
			.mockImplementationOnce(init => [init, jest.fn()])
			.mockImplementationOnce(init => [init, useState])

		const wrapper = setup({ component, props, initialState })
		const breedSelector = wrapper.find(BreedSelector)

		breedSelector?.simulate('change', maybeSelectedBreed)

		expect(useState).toHaveBeenCalledWith(O.none)
	})

	it('should dispatch reset random image', () => {
		jest.spyOn(React, 'useState').mockImplementation(init => [init, jest.fn()])

		const wrapper = setup({ component, props, initialState, dispatch })
		const breedSelector = wrapper.find(BreedSelector)

		breedSelector?.simulate('change', maybeSelectedBreed)

		expect(dispatch).toHaveBeenCalledWith({ type: RESET_RANDOM_IMAGE })
	})
})
