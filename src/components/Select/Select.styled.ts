import styled, { css } from 'styled-components';

import { ISelectStyledProps } from './types';

export const SelectStyled = styled.div<ISelectStyledProps>`
${({ showOptions, disabled, theme: {
	border, borderRadius, minHeight, brandPrimary
} }) => css`

		position: relative;
		display: flex;
		align-items: center;

		.wrapper {
			width: 100%;
			max-width: 20rem;
			position: relative;
		}

		.list {
			opacity: 0;
			height: 0;
      margin: 0;
			padding: 0;
			transition: opacity .5s;
			overflow: hidden;
			list-style-type: none;
			background: white;
    	max-height: 20rem;
    	overflow: auto;
			
			${showOptions && css`
				border: ${border};
				height: auto;
				opacity: 1;
			`}
		}

		.value {
			border: ${border};
			border-radius: ${borderRadius};
      padding: .5rem;
			min-height: ${minHeight};
			box-sizing: border-box;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			${!disabled && css` cursor: pointer; `}
		}

		li {
      padding: .5rem;

			${showOptions && css` cursor: pointer; `}
			&:hover { background: ${brandPrimary}; }
		}

		.list {
			border-top: none;
			position: absolute;
			width: 100%;
			box-sizing: border-box;
			z-index: 1;
		}

		.text {
			${!disabled && css` cursor: pointer; `}
			margin-left: .5rem;
		}

	`}
`
