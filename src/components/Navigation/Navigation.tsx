import React from 'react';
import { Link } from 'react-router-dom'

import { NavigationStyled } from './Navigation.style';

export const Navigation = () => (
	<NavigationStyled>
		<ul>

			<li>
				<Link to="/">
					<h3>Random by breed</h3>
				</Link>
			</li>

			<li>
				<Link to="/list">
					<h3>List by breed</h3>
				</Link>
			</li>

			<li>
				<Link to="/sub/random">
					<h3>Random by sub-breed</h3>
				</Link>
			</li>

			<li>
				<Link to="/sub/list">
					<h3>List by sub-breed</h3>
				</Link>
			</li>

		</ul>
	</NavigationStyled>
)
