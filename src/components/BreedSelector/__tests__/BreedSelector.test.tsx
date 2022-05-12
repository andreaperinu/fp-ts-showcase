import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';

import { ISelectItem } from '@/components/Select/types';
import { IBreed } from '@/models/models';
import * as mockedBreeds from '@/tests/mockedBreeds.json';
import { findByDataTest, setup } from '@/tests/utils';
import { formatBreeds, maybeBreedToSelectItem } from '@/utils/utils';

import { BreedSelector as component } from '../BreedSelector';

const onChange = jest.fn()

const maybeBreeds: O.Option<IBreed[]> = pipe(
	mockedBreeds,
	formatBreeds,
	O.fromNullable,
)

const maybeSelectedBreed: O.Option<IBreed> = pipe(maybeBreeds, O.chain(A.head))

const props: React.ComponentProps<typeof component> = {
	maybeBreeds,
	maybeSelectedBreed,
	onChange,
}

describe('<BreedSelector />', () => {
	it('should match snapshot', () => {
		const wrapper = setup({ component, props })
		expect(wrapper).toMatchSnapshot()
	})

	it('should set breed', () => {
		const mockedMaybeSelectItem: O.Option<ISelectItem> = pipe(
			maybeSelectedBreed,
			maybeBreedToSelectItem,
		)

		const wrapper = setup({ component, props })
		const select = findByDataTest(wrapper, 'select')

		select?.simulate('change', mockedMaybeSelectItem)

		expect(onChange).toHaveBeenCalledWith(maybeSelectedBreed)
	})
})