import React from 'react';
import { Link } from 'react-router-dom';

const EntryItem = (props) => (
	<Link to={`/entries/${props.entry.id}`}>
		<li>
			<img className="deleteEntry" alt="Delete entry" onClick={ () => props.removeEntry(props.entry.id) } src="/images/trash.svg" />
			<span className="recordTitle">{ props.entry.title }</span><span className="recordTasks">{ props.entry.tasks[0].content }</span>
			<p>{ new Date(props.entry.timestamp).toLocaleDateString() }</p>
		</li>
	</Link>
);

export default EntryItem;