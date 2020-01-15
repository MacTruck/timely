import React from 'react';

import { Consumer } from './Context';

import Timer from './Timer';
import Task from './Task';

const TimerScreen = () =>  {

    return (
        <Consumer>
            { context => (
                <div>
                    <Timer entry={ context.newEntry } />
                    <form id='recordForm'>
                        <input type="text" name="entry" placeholder={ context.newEntry.title } onBlur={ e => context.actions.updateEntry(context.newEntry, e.target.value, "title")} />

                        { context.newEntry.tasks.map( (task) => 
                            <Task entry={ context.newEntry }
                                  key={ task.key }
                                  taskId={ task.key }
                                  task={ task.content } />
                        )}

                        <div id="addTaskButton" onClick={ () => context.actions.addTask( context.newEntry ) }>+</div>
                    </form>
                </div>
            )}
        </Consumer>
    );
}

export default TimerScreen;