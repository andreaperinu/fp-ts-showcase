import * as B from 'fp-ts/lib/boolean';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { memo, useCallback } from 'react';

import { noopComponent } from '@/utils/utils';

import { FixedImageStyled, ImageStyled } from './Image.styled';
import { IImageProps } from './types';

export const BaseImage = ({ maybeImage, fixedSize = false }: IImageProps) => {

	const renderImage = useCallback((src: string) => pipe(
		fixedSize,
		B.fold(
			() => <ImageStyled src={src} />,
			() => <FixedImageStyled imgSrc={src} />
		),
	), [fixedSize])

	return pipe(maybeImage, O.map(renderImage), O.getOrElse(noopComponent))
}

export const Image = memo(BaseImage)
