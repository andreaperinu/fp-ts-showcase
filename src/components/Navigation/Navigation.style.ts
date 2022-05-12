import styled, { css } from 'styled-components';

import { StyledTheme } from '@/styles/theme';

export const NavigationStyled = styled.nav`
${({
	theme: { deepBlue, buttonColor }
}: { theme: StyledTheme }) => css`

		ul {
			display: flex;
    	flex-wrap: wrap;
			list-style-type: none;
			padding: 0;
			margin: 0;
		}
		
		li {
			color: ${buttonColor};

			&:not(:last-child) {
				margin-right: 2rem;
			}

			a {
				text-decoration: none;
			}

			h3 {
				display: inline-block;
				color: #000;
				border-bottom: 2px solid ${deepBlue};
				padding-bottom: .2rem;
				margin-top: 0;
				transition: color .5s, border-bottom .5s;

				&:hover {
					color: ${deepBlue};
					border-bottom-color: transparent;
				}
			}
		}

	`}
`
