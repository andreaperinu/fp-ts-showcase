import * as O from 'fp-ts/lib/Option';

import { IBreed } from '@/models/models';

export interface IBreedSelectorProps {
	maybeSelectedBreed: O.Option<IBreed>,
	maybeBreeds: O.Option<IBreed[]>,
	onChange: (maybeBreed: O.Option<IBreed>) => void
}
