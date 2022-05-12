import { IBreed } from '@/models/models';
import { setup } from '@/tests/utils';
import { pipe } from 'fp-ts/lib/function';
import * as mockedBreeds from '@/tests/mockedBreeds.json';
import * as A from 'fp-ts/lib/Array'
import component from '../SubBreedListPage';
import * as O from 'fp-ts/lib/Option'
import { formatBreeds } from '@/utils/utils';
import React from 'react'
import { BreedPayload } from '@/store/actions/actions';
import { sequenceT } from 'fp-ts/lib/Apply';
import { IStoreState } from '@/store/types';
import { FETCH_IMAGES, RESET_IMAGES } from '@/store/actions/rawActions';
import { BreedSelector } from '@/components/BreedSelector/BreedSelector';

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
	maybeImages: O.none,
}

beforeEach(() => {
	useState.mockClear()
	dispatch.mockClear()
})

describe('<SubBreedListPage />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props, initialState })
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

		expect(dispatch).toHaveBeenCalledWith({ payload, type: FETCH_IMAGES })
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

		expect(dispatch).toHaveBeenCalledWith({ type: RESET_IMAGES })
	})
})
