/* istanbul ignore file */

const brandPrimary = '#d3d3d3'
const brandSecondary = '#a9a9a9'
const brandTertiary = '#fcfcfc'
const slateColor = 'slategrey'
const borderColor = brandPrimary
const deepBlue = 'steelblue'

export const theme = {
	borderRadius: '3px',
	minHeight: '40px',
	color: '#000',
	border: `1px solid ${borderColor}`,
	fontSize: '1rem',
	containerWidth: '960px',
	borderColor,
	brandPrimary,
	brandSecondary,
	brandTertiary,
	headerBackground: 'aliceblue',
	headerColor: slateColor,
	rootBorderColor: slateColor,
	buttonColor: deepBlue,
	boxShadow: '1px 1px 5px 0px rgba(50, 50, 50, 0.75)',
	footerColor: '#FFF',
	footerBackground: '#000',
	deepBlue,
}

export type StyledTheme = typeof theme
