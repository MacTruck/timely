import React from 'react';

import Timer from './Timer.jsx';

const Task = (props) => {
  return (
    <div className="taskHolder">
      <textarea rows="1" placeholder={props.task.task_content || 'Task'} onBlur={e => props.updateTask(props.newEntry, e.target.value, props.task.task_id)} ></textarea>
      <div className="removeTaskButton" onClick={() => props.removeTask(props.newEntry, props.task.task_id)}>-</div>
    </div>
  )
}

const TimerScreen = (props) => {
  return (
        <div>
          <Timer
            newEntry={props.newEntry} 
            updateEntry={props.actions.updateEntry}
            submitEntry={props.actions.submitEntry}
          />
          <form id="recordForm">
            <input
              type="text"
              name="entry"
              placeholder={props.newEntry.projectName}
              onBlur={e => props.actions.updateEntry(props.newEntry, e.target.value, "projectName")}
            />

            {props.newEntry.tasks.map((task) =>
              <Task 
                newEntry={props.newEntry}
                key={task.task_id}
                task={task}
                updateTask={props.actions.updateTask}
                removeTask={props.actions.removeTask}
              />
            )}

            <div id="addTaskButton" onClick={() => props.actions.addTask(props.newEntry)}>+</div>
          </form>
        </div>
  );
}

export default TimerScreen;