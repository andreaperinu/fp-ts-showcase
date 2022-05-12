import * as O from 'fp-ts/lib/Option'

export interface IImageProps {
	maybeImage: O.Option<string>
	fixedSize?: boolean
}
