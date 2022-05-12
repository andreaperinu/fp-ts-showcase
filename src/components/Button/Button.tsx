import styled, { css } from 'styled-components';

export const Button = styled.button`
${({ theme: {
    brandPrimary, minHeight, border, borderRadius, color, brandSecondary
} }) => css`

		background: ${brandPrimary};
    min-height: ${minHeight};
    border: ${border};
    border-radius: ${borderRadius};
		color: ${color};
    padding: 0 1.5rem;
		font-weight: bold;
		outline: none;
    cursor: pointer;
		
		&:disabled {
			opacity: .6;
			cursor: default;
		}

		&:not(:disabled) {
			&:hover {
				background: ${brandSecondary};
			}
		}
	`}
`
