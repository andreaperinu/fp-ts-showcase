import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { useCallback } from 'react';

import {
	maybeSubBreedBySelectItem, maybeSubBreedsToSelectItems, maybeSubBreedToSelectItem
} from '@/utils/utils';

import { Select } from '../Select/Select';
import { ISelectItem } from '../Select/types';
import { SubBreedSelectorStyled } from './SubBreedSelector.styled';
import { ISubBreedSelectorProps } from './types';

export const SubBreedSelector = ({
	maybeSelectedSubBreed, maybeBreed, disabled = false, onChange,
}: ISubBreedSelectorProps) => {
	const onChangeHandler = useCallback((maybeSelectItem: O.Option<ISelectItem>) => pipe(
		maybeSelectItem,
		maybeSubBreedBySelectItem,
		onChange,
	), [onChange])

	return (
		<SubBreedSelectorStyled disabled={disabled}>
			<h2>Then, select a sub-breed</h2>
			<Select
				disabled={disabled}
				maybeValue={pipe(maybeSelectedSubBreed, maybeSubBreedToSelectItem)}
				maybeOptions={pipe(maybeBreed, maybeSubBreedsToSelectItems)}
				onChange={onChangeHandler}
				data-test="component-select"
			/>
		</SubBreedSelectorStyled>
	)
}
