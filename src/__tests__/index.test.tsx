import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { App } from '../App';
import { theme } from '../styles/theme';

Object.assign(React, { StrictMode: () => <div></div> })
jest.mock('react-dom', () => ({ render: jest.fn() }))

it('renders without crashing', () => {
	const div = document.createElement('div');
	global.document.getElementById = (id) => id === 'root' && div

	require("../index.tsx")

	expect(ReactDOM.render).toHaveBeenCalledWith(
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Router>
					<App />
				</Router>
			</ThemeProvider>
		</React.StrictMode>,
		div
	)
});
