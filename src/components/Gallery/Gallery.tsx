import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';

import { Image } from '@/components/Image/Image';
import { noopComponent } from '@/utils/utils';

import { GalleryStyled } from './Gallery.styled';
import { IGalleryProps } from './types';

const renderImage = (img: string) => (
	<Image key={img} maybeImage={pipe(img, O.fromNullable)} fixedSize={true} />
)

export const Gallery = ({ maybeImages }: IGalleryProps) => pipe(
	maybeImages,
	O.map(A.map(renderImage)),
	O.chain(O.fromPredicate(A.isNonEmpty)),
	O.map(items => <GalleryStyled>{items}</GalleryStyled>),
	O.getOrElse(noopComponent)
)
