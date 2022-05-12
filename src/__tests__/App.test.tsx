import React from 'react';
import { act } from 'react-dom/test-utils';
import reactRouter from 'react-router';

import { FETCH_BREEDS, RESET_IMAGES, RESET_RANDOM_IMAGE } from '@/store/actions/rawActions';
import { setup } from '@/tests/utils';
import * as O from 'fp-ts/lib/Option'
import { App as component } from '../App';
import { IStoreState } from '@/store/types';

const dispatch = jest.fn()

beforeEach(() => {
	reactRouter.useLocation = jest.fn().mockReturnValue({ pathname: '' })
})

const initialState: Partial<IStoreState> = {
	maybeBreeds: O.none,
	maybeRandomImage: O.none,
}

describe('<App />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props: {} })
		expect(wrapper).toMatchSnapshot()
	})

	it('should fetch breeds', () => {
		jest.spyOn(React, 'useEffect').mockImplementation(f => f())

		setup({
			component, props: {}, initialState, dispatch, shouldMount: true, shouldHaveRouter: true
		})

		expect(dispatch).toHaveBeenCalledWith({ type: FETCH_BREEDS })
	})

	it('should dispatch reset random image', () => {
		const wrapper = setup({
			component, props: {}, initialState, dispatch, shouldMount: true, shouldHaveRouter: true
		})

		void act(() => { wrapper.unmount() })

		expect(dispatch).toHaveBeenCalledWith({ type: RESET_RANDOM_IMAGE })
	})

	it('should dispatch reset images', () => {
		const wrapper = setup({
			component, props: {}, initialState, dispatch, shouldMount: true, shouldHaveRouter: true
		})

		void act(() => { wrapper.unmount() })

		expect(dispatch).toHaveBeenCalledWith({ type: RESET_IMAGES })
	})
})
