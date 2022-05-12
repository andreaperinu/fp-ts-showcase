import { constVoid, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React, { useEffect } from 'react';

import { BreedSelector } from '@/components/BreedSelector/BreedSelector';
import { Gallery } from '@/components/Gallery/Gallery';
import { IBreed } from '@/models/models';
import { fetchImages } from '@/store/actions';
import { useStore } from '@/store/store';

const BreedListPage = () => {
	const [store, dispatch] = useStore()
	const [maybeSelectedBreed, setMaybeSelectedBreed] = React.useState<O.Option<IBreed>>(O.none)

	const { maybeBreeds, maybeImages } = store

	useEffect(() => {
		pipe(
			maybeSelectedBreed,
			O.fold(constVoid, ({ breed }) => dispatch(fetchImages({ breed })))
		)
	}, [maybeSelectedBreed])

	return (
		<>
			<BreedSelector
				maybeSelectedBreed={maybeSelectedBreed}
				maybeBreeds={maybeBreeds}
				onChange={setMaybeSelectedBreed}
			/>

			<Gallery maybeImages={maybeImages} />
		</>
	)
}

export default BreedListPage
