import styled, { css } from 'styled-components';

export const AppStyled = styled.div`
${({ theme: {
	containerWidth, brandTertiary, headerBackground, headerColor, rootBorderColor,
	footerBackground, footerColor,
} }) => css`

		display: flex;
		margin: auto;
		flex-direction: column;
		min-height: 100vh;
		max-width: ${containerWidth};
		background-color: ${brandTertiary};

		header {
			text-align: center;
			background: ${headerBackground};
			color: ${headerColor};
		}

		main {
			flex: 1;
			position: relative;
			overflow-x: auto;
		}

		footer {
			text-align: center;
			background: ${footerBackground};
			color: ${footerColor};
		}

		header,
		main,
		footer {
			padding: 2rem;
		}

		header,
		main {
			border-bottom: 1px solid ${rootBorderColor};
		}

	`}
`
