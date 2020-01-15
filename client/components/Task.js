import React from 'react';

import { Consumer } from './Context';

const Task = (props) => (
	<Consumer>
		{ context => (
			<div className="taskHolder">
		    	<textarea rows="1" placeholder={ props.task || 'Task'} onBlur={ e => context.actions.updateTask(props.entry, e.target.value, props.taskId)} ></textarea>
		    	<div className="removeTaskButton" onClick={ () => context.actions.removeTask(props.entry, props.taskId) }>-</div>
			</div>
		)}
	</Consumer>
);

export default Task;