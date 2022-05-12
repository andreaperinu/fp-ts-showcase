import { sequenceT } from 'fp-ts/lib/Apply';
import { constVoid, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React, { useCallback, useEffect, useMemo } from 'react';

import { BreedSelector } from '@/components/BreedSelector/BreedSelector';
import { Button } from '@/components/Button/Button';
import { Image } from '@/components/Image/Image';
import { SubBreedSelector } from '@/components/SubBreedSelector/SubBreedSelector';
import { IBreed } from '@/models/models';
import { fetchRandomImage, resetRandomImage } from '@/store/actions';
import { useStore } from '@/store/store';
import { filterBreedsBySubBreeds } from '@/utils/utils';

const SubBreedRandomPage = () => {
	const [store, dispatch] = useStore()
	const [maybeSelectedBreed, setMaybeSelectedBreed] = React.useState<O.Option<IBreed>>(O.none)
	const [maybeSelectedSubBreed, setMaybeSelectedSubBreed] = React.useState<O.Option<string>>(O.none)

	const { maybeBreeds, maybeRandomImage } = store

	const filteredBreeds = useMemo(() => pipe(maybeBreeds, filterBreedsBySubBreeds), [maybeBreeds])

	const maybeFetchRandomImage = useCallback(() => pipe(
		sequenceT(O.option)(maybeSelectedBreed, maybeSelectedSubBreed),
		O.fold(constVoid, ([{ breed }, subBreed]) => (
			dispatch(fetchRandomImage({ breed: `${breed}/${subBreed}` })))
		)
	), [maybeSelectedBreed, maybeSelectedSubBreed])

	useEffect(() => {
		maybeFetchRandomImage()
	}, [maybeSelectedBreed, maybeSelectedSubBreed, dispatch])

	const onChangeBreedHandler = useCallback((maybeBreed: O.Option<IBreed>) => {
		setMaybeSelectedBreed(maybeBreed)
		setMaybeSelectedSubBreed(O.none)
		dispatch(resetRandomImage())
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

			<Button
				disabled={O.isNone(maybeSelectedSubBreed)}
				className="fetcher-button"
				onClick={maybeFetchRandomImage}
			>
				Fetch!
			</Button>

			<Image maybeImage={maybeRandomImage} />
		</>
	)
}

export default SubBreedRandomPage
