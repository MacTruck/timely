import React from 'react';

import { Link } from 'react-router-dom';

const EntryItem = (props) => (
  <Link to={`/entries/${props.entry.id}`}>
    <li>
      <img className="deleteEntry" alt="Delete entry" onClick={() => props.removeEntry(props.entry.id)} src="/images/trash.svg" />
      <span className="recordTitle">{props.entry.title}</span><span className="recordTasks">{props.entry.tasks[0].content}</span>
      <p>{new Date(props.entry.timestamp).toLocaleDateString()}</p>
    </li>
  </Link>
);

const RecentEntries = (props) => {
  return (
    <ul className="recordList">
      <h3>Recent Entries</h3>
      <React.Fragment>
        {props.entries
          .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
          .map(entry =>
            <EntryItem entry={entry}
              removeEntry={props.removeEntry} />
          )}
      </React.Fragment>
    </ul>
  );
}

const StartScreen = (props) => {
  return (
    <div>
      <Link to="/timer" id="startButton" className="mainButton" onClick={() => props.addEntry()}>Start Timer</Link>
      <RecentEntries entries={props.entries} removeEntry={props.removeEntry} />
    </div>
  );
}

export default StartScreen;