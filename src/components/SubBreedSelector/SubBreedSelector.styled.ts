import styled, { css } from 'styled-components';

import { ISubBreedSelectorStyledProps } from './types';

export const SubBreedSelectorStyled = styled.div<ISubBreedSelectorStyledProps>`
${({ disabled }) => css`

		h2 {
			${disabled && css` opacity: 0.6; `}
		}
	`}
`
