import { sequenceT } from 'fp-ts/lib/Apply';
import { constVoid, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React, { useCallback, useEffect, useMemo } from 'react';

import { BreedSelector } from '@/components/BreedSelector/BreedSelector';
import { Gallery } from '@/components/Gallery/Gallery';
import { SubBreedSelector } from '@/components/SubBreedSelector/SubBreedSelector';
import { IBreed } from '@/models/models';
import { fetchImages, resetImages } from '@/store/actions';
import { useStore } from '@/store/store';
import { filterBreedsBySubBreeds } from '@/utils/utils';

const SubBreedListPage = () => {
	const [store, dispatch] = useStore()
	const [maybeSelectedBreed, setMaybeSelectedBreed] = React.useState<O.Option<IBreed>>(O.none)
	const [maybeSelectedSubBreed, setMaybeSelectedSubBreed] = React.useState<O.Option<string>>(O.none)

	const { maybeBreeds, maybeImages } = store

	const filteredBreeds = useMemo(() => pipe(maybeBreeds, filterBreedsBySubBreeds), [maybeBreeds])

	useEffect(() => {
		pipe(
			sequenceT(O.option)(maybeSelectedBreed, maybeSelectedSubBreed),
			O.fold(constVoid, ([{ breed }, subBreed]) => (
				dispatch(fetchImages({ breed: `${breed}/${subBreed}` })))
			)
		)
	}, [maybeSelectedBreed, maybeSelectedSubBreed, dispatch])

	const onChangeBreedHandler = useCallback((maybeBreed: O.Option<IBreed>) => {
		setMaybeSelectedBreed(maybeBreed)
		setMaybeSelectedSubBreed(O.none)
		dispatch(resetImages())
	}, [dispatch])

	const isSubBreedDisabled = useMemo(() => O.isNone(maybeSelectedBreed), [maybeSelectedBreed])

	return (
		<>
			<BreedSelector
				maybeSelectedBreed={maybeSelectedBreed}
				maybeBreeds={filteredBreeds}
				onChange={onChangeBreedHandler}
			/>

			<SubBreedSelector
				disabled={isSubBreedDisabled}
				maybeSelectedSubBreed={maybeSelectedSubBreed}
				maybeBreed={maybeSelectedBreed}
				onChange={setMaybeSelectedSubBreed}
			/>

			<Gallery maybeImages={maybeImages} />
		</>
	)
}

export default SubBreedListPage
