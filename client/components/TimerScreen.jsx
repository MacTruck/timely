import React from 'react';

import Timer from './Timer.jsx';

const Task = (props) => {
  return (
    <div className="taskHolder">
      <textarea rows="1" placeholder={props.task || 'Task'} onBlur={e => props.actions.updateTask(props.entry, e.target.value, props.taskId)} ></textarea>
      <div className="removeTaskButton" onClick={() => props.actions.removeTask(props.entry, props.taskId)}>-</div>
    </div>
  )
}

const TimerScreen = (props) => {
  return (
        <div>
          <Timer
            entry={props.newEntry} 
            updateEntry={props.actions.updateEntry}
            submitEntry={props.actions.submitEntry}
          />
          <form id="recordForm">
            <input
              type="text"
              name="entry"
              placeholder={props.newEntry.title}
              onBlur={e => props.updateEntry(props.newEntry, e.target.value, "title")}
            />

            {props.newEntry.tasks.map((task) =>
              <Task 
                entry={props.newEntry}
                key={task.key}
                taskId={task.key}
                task={task.content} 
                updateTask={props.actions.updateTask}
                removeTask={props.actions.removeTask}
              />
            )}

            <div id="addTaskButton" onClick={() => props.addTask(props.newEntry)}>+</div>
          </form>
        </div>
  );
}

export default TimerScreen;