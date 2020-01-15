import React from 'react';

import { Consumer } from './Context';
import { Link } from 'react-router-dom';

import RecentEntries from './RecentEntries';

const StartScreen = () => {
	return (
		<Consumer>
			{ context => (
				<div>
					<Link to="/timer" id="startButton" className="mainButton" onClick={ () => context.actions.addEntry() }>Start Timer</Link>
					<RecentEntries />
				</div>
			)}
	  	</Consumer>
	);
}

export default StartScreen;