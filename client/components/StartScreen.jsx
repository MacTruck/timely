import React from 'react';
import { Link } from 'react-router-dom';
import convertTime from './convertTime.js';

// import WarningScreen from './WarningScreen.jsx';

import trashIcon from '../assets/trash.svg';
import WarningScreen from './WarningScreen.jsx';

const EntryItem = (props) => {
  // convert elapsedTime into string
  const timeObject = convertTime(props.entry.elapsedTime);
  const timeString = ` ${timeObject.hours}h ${timeObject.minutes}m ${timeObject.seconds}s`;

  // function confirmDeletion(entryId) {}

  return (
    // <Link to={`/entries/${props.entry.id}`}>
      <li>
        <img className="deleteEntry" alt="Delete entry" onClick={() => props.removeEntry(props.entry._id)} src={trashIcon} />
        <span className="recordTitle">{props.entry.projectName}</span><span className="recordTasks">{props.entry.tasks[0].task_content}</span>
        <p>
          {new Date(Number(props.entry.entry_timestamp)).toLocaleDateString()} - {timeString}
        </p>
      </li>
    // </Link>
  );
}

const RecentEntries = (props) => {
  return (
    <ul className="recordList">
      <h3>Recent Entries</h3>
      <React.Fragment>
        {props.entries
          .sort((a, b) => a.entry_timestamp > b.entry_timestamp ? -1 : 1)
          .map(entry =>
            <EntryItem
              key={entry.entry_id} 
              entry={entry}
              removeEntry={props.removeEntry} />
          )}
      </React.Fragment>
    </ul>
  );
}

const StartScreen = (props) => {

  function handleAddEntry() {
    let newEntry = {
      temp_id: props.entries.length,
      projectName: 'Project / Client',
      entry_timestamp: new Date().getTime(),
      elapsedTime: null,
      tasks: [
        {
          task_id: 0,
          task_content: '',
          task_timestamp: new Date().getTime(),
        }
      ],
    }

    props.updateState({ newEntry });
  }

  return (
    <div>
      <Link to="/timer" id="startButton" className="mainButton" onClick={handleAddEntry}>Start Timer</Link>
      <RecentEntries entries={props.entries} removeEntry={props.removeEntry} />
    </div>
  );
}

export default StartScreen;
