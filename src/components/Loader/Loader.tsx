import styled, { css } from 'styled-components';

export const Loader = styled.div`
${({ theme: {
	brandTertiary, brandSecondary,
} }) => css`

		border-radius: 50%;
		width: 10em;
		height: 10em;
		margin: 60px auto;
		font-size: 10px;
		position: relative;
		text-indent: -6666em;
		border-top: 1.1em solid ${brandTertiary};
		border-right: 1.1em solid ${brandTertiary};
		border-bottom: 1.1em solid ${brandTertiary};
		border-left: 1.1em solid ${brandSecondary};
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-animation: load 1.1s infinite linear;
		animation: load 1.1s infinite linear;

		&:after {
			border-radius: 50%;
			width: 10em;
			height: 10em;
		}

		@-webkit-keyframes load {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}

		@keyframes load {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}
	`}
`
