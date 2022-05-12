import * as O from 'fp-ts/lib/Option';

import { IBreed } from '@/models/models';

export interface ISubBreedSelectorProps {
	disabled?: boolean
	maybeSelectedSubBreed: O.Option<string>,
	maybeBreed: O.Option<IBreed>,
	onChange: (maybeSubBreed: O.Option<string>) => void
}

export interface ISubBreedSelectorStyledProps {
	disabled: boolean
}
