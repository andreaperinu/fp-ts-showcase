import { sequenceT } from 'fp-ts/lib/Apply';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

import { ISelectItem } from '@/components/Select/types';
import { IBreed, IBreedResponseMessage } from '@/models/models';

export const noopComponent = () => <></>

export const maybeBreedToSelectItem = (maybeBreed: O.Option<IBreed>): O.Option<ISelectItem> => pipe(
	maybeBreed,
	O.map(({ breed }) => ({ id: breed, value: breed }))
)

export const maybeBreedsToSelectItems = (maybeBreeds: O.Option<IBreed[]>): O.Option<ISelectItem[]> => pipe(
	maybeBreeds,
	O.chain(O.fromPredicate(A.isNonEmpty)),
	O.map(A.map(({ breed }) => ({ id: breed, value: breed })))
)

export const maybeSubBreedToSelectItem = (subBreed: O.Option<string>): O.Option<ISelectItem> => pipe(
	subBreed,
	O.map(breed => ({ id: breed, value: breed })),
)

export const maybeSubBreedsToSelectItems = (breed: O.Option<IBreed>): O.Option<ISelectItem[]> => pipe(
	breed,
	O.map(({ subBreeds }) => subBreeds),
	O.map(A.map(value => ({ id: value, value: value })))
)

export const maybeBreedBySelectItem = (maybeBreeds: O.Option<IBreed[]>) => (
	maybeSelectItem: O.Option<ISelectItem>,
): O.Option<IBreed> => pipe(
	sequenceT(O.option)(maybeSelectItem, maybeBreeds),
	O.chain(([{ value }, breeds]) => A.findFirst(({ breed }: IBreed) => breed === value)(breeds))
)

export const maybeSubBreedBySelectItem = (
	maybeSelectItem: O.Option<ISelectItem>
): O.Option<string> => pipe(maybeSelectItem, O.map(({ value }) => value))

export const formatBreeds = (message: IBreedResponseMessage): IBreed[] => pipe(
	Object.keys(message),
	A.map(key => ({ breed: key, subBreeds: message[key] }))
)

export const filterBreedsBySubBreeds = (maybeBreeds: O.Option<IBreed[]>): O.Option<IBreed[]> => {

	const validSubBreedFilter = ({ subBreeds }: IBreed): boolean => pipe(subBreeds, A.isNonEmpty)

	return pipe(
		maybeBreeds,
		O.map(A.filter(validSubBreedFilter)),
	)
}
