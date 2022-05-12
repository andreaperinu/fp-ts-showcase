import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { useCallback } from 'react';

import {
	maybeBreedBySelectItem, maybeBreedsToSelectItems, maybeBreedToSelectItem
} from '@/utils/utils';

import { Select } from '../Select/Select';
import { ISelectItem } from '../Select/types';
import { IBreedSelectorProps } from './types';

export const BreedSelector = ({
	maybeSelectedBreed, maybeBreeds, onChange,
}: IBreedSelectorProps) => {
	
	const onChangeHandler = useCallback((maybeSelectItem: O.Option<ISelectItem>) => pipe(
		maybeSelectItem,
		maybeBreedBySelectItem(maybeBreeds),
		onChange,
	), [maybeBreeds])

	return (
		<>
			<h2>Select a breed</h2>
			<Select
				maybeValue={pipe(maybeSelectedBreed, maybeBreedToSelectItem)}
				maybeOptions={pipe(maybeBreeds, maybeBreedsToSelectItems)}
				onChange={onChangeHandler}
				data-test="component-select"
			/>
		</>
	)
}
