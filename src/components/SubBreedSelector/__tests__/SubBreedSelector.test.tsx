import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';

import { ISelectItem } from '@/components/Select/types';
import { IBreed } from '@/models/models';
import * as mockedBreeds from '@/tests/mockedBreeds.json';
import { findByDataTest, setup } from '@/tests/utils';
import { formatBreeds, maybeSubBreedToSelectItem } from '@/utils/utils';

import { SubBreedSelector as component } from '../SubBreedSelector';

const onChange = jest.fn()

const maybeBreed: O.Option<IBreed> = pipe(
	mockedBreeds,
	formatBreeds,
	A.head,
)

const maybeSelectedSubBreed: O.Option<string> = pipe(
	maybeBreed,
	O.map(({ subBreeds }) => subBreeds),
	O.chain(A.head),
)

const props: React.ComponentProps<typeof component> = {
	maybeBreed,
	maybeSelectedSubBreed,
	onChange,
}

describe('<BreedSelector />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props })
		expect(wrapper).toMatchSnapshot()
	})

	it('should set sub-breed', () => {
		const mockedMaybeSelectItem: O.Option<ISelectItem> = pipe(
			maybeSelectedSubBreed,
			maybeSubBreedToSelectItem,
		)

		const wrapper = setup({ component, props })
		const select = findByDataTest(wrapper, 'select')

		select?.simulate('change', mockedMaybeSelectItem)

		expect(onChange).toHaveBeenCalledWith(maybeSelectedSubBreed)
	})
})
