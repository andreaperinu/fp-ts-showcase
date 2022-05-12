/* istanbul ignore file */

/** Breakpoints
  *  Conversion Table (base 16px)
  *  extraSmall = 30em → 480px
  *  small = 48em → 768px
  *  medium = 60em → 960px
  *  large = 80em → 1280px
  *  extraLarge = 100em → 1600px
  */

const size = {
	extraSmall: '30em',
	small: '48em',
	medium: '60em',
	large: '80em',
	extraLarge: '100em'
}

export const device = {
  fromExtraSmall: `(min-width: ${size.extraSmall})`,
  fromSmall: `(min-width: ${size.small})`,
  fromMedium: `(min-width: ${size.medium})`,
  fromLarge: `(min-width: ${size.large})`,
  fromExtraLarge: `(min-width: ${size.extraLarge})`,
}
