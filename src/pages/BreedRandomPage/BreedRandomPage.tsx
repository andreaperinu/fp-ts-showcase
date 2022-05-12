import { constVoid, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React, { useCallback, useEffect } from 'react';

import { BreedSelector } from '@/components/BreedSelector/BreedSelector';
import { Button } from '@/components/Button/Button';
import { Image } from '@/components/Image/Image';
import { IBreed } from '@/models/models';
import { fetchRandomImage } from '@/store/actions';
import { useStore } from '@/store/store';

const BreedRandomPage = () => {
	const [store, dispatch] = useStore()
	const [maybeSelectedBreed, setMaybeSelectedBreed] = React.useState<O.Option<IBreed>>(O.none)

	const { maybeBreeds, maybeRandomImage } = store

	const maybeFetchRandomImage = useCallback(() => pipe(
		maybeSelectedBreed,
		O.fold(constVoid, ({ breed }) => dispatch(fetchRandomImage({ breed })))
	), [maybeSelectedBreed, dispatch])

	useEffect(() => {
		maybeFetchRandomImage()
	}, [maybeSelectedBreed])

	return (
		<>
			<BreedSelector
				maybeSelectedBreed={maybeSelectedBreed}
				maybeBreeds={maybeBreeds}
				onChange={setMaybeSelectedBreed}
			/>

			<Button
				disabled={O.isNone(maybeSelectedBreed)}
				className="fetcher-button"
				onClick={maybeFetchRandomImage}
			>
				Fetch!
			</Button>

			<Image maybeImage={maybeRandomImage} />
		</>
	)
}

export default BreedRandomPage
