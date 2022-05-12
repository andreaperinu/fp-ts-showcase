import styled, { css } from 'styled-components';

export const ImageStyled = styled.img`
	display: block;
	margin: 3rem auto 1rem auto;
	width: 100%;
	max-width: 30rem;
`

export const FixedImageStyled = styled.div<{ imgSrc: string }>`
${({ imgSrc }) => css`
		display: block;
		margin: 3rem auto 1rem auto;
		width: 100%;
		max-width: 30rem;
		background: url(${imgSrc}) no-repeat center center; 
  	background-size: cover;
		padding-top: 56.25%
	`}
`
