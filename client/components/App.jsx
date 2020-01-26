import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Header from './Header.jsx';
import StartScreen from './StartScreen.jsx';
import TimerScreen from './TimerScreen.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      _id: null,
      email: '',
      username: '',
      entries: [],
      newEntry: {},
      taskKeyMaker: 0,
    };
  
    this.updateState = this.updateState.bind(this);
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
    this.handleRemoveEntry = this.handleRemoveEntry.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleSubmitEntry = this.handleSubmitEntry.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
  }

  updateState(data) {
    this.setState(data, () => console.log('this.state: ', this.state));
  }

  handleAddEntry(entryProject = 'Project / Client') {
    let entrieslength = `temp_${this.state.entries.length}`;
    let newEntry = {
      _id: entrieslength,
      projectName: entryProject,
      tasks: [
        {
          key: `temp_${this.state.taskKeyMaker += 1}`,
          content: ''
        }
      ],
      timestamp: new Date().getTime(),
      elapsedTime: null,
    }
    this.setState({ newEntry });
  }

  handleSubmitEntry() {
    // LOCAL: Push newEntry into local entries array
    const updatedEntries = [
      ...this.state.entries,
      this.state.newEntry
    ];
    this.setState({ entries: updatedEntries });

    // REMOTE: Update remote entry in db
    const remoteEntryObject = {
      newEntry: this.state.newEntry,
      email: this.state.email,
    }
    fetch('/submitEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(remoteEntryObject),
    })
  }

  handleRemoveEntry(id) {
    console.log('within handleRemoveEntry - id: ', id);
    // LOCAL: Splice entry from local entries array
    const updatedEntries = this.state.entries.filter(entry => entry._id != id);
    this.setState({ entries: updatedEntries });

    // REMOTE: Drop entry
    const remoteRemoveEntryObject = {
      entryId: id,
      email: this.state.email,
    }
    fetch('/removeEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(remoteRemoveEntryObject)
    })
      .then(response => response.json())
      .then(data => console.log('data from handleRemoveEntry: ', data))
      .catch(err => console.log('Error in handleRemoveEntry: ', err));
  }

  handleUpdateEntry(currentEntry, entryData, updateProperty) {
    currentEntry[updateProperty] = entryData;
    this.setState({ newEntry: currentEntry });
  }

  handleAddTask(currentEntry) {
    if (currentEntry.tasks[(currentEntry.tasks.length - 1)].content !== '') {
      currentEntry.tasks.push({ key: this.state.taskKeyMaker += 1, content: '' });
      this.setState({ newEntry: currentEntry });
    }
  }

  handleUpdateTask(currentEntry, taskData, taskKey) {
    currentEntry.tasks = currentEntry.tasks.map(task => task.key === taskKey ? { ...task, content: taskData } : task);
    this.setState({ newEntry: currentEntry });
  }

  handleRemoveTask(currentEntry, taskId) {
    if (currentEntry.tasks.length > 1) {
      let updatedEntry = {
        ...currentEntry,
        tasks: currentEntry.tasks.filter(task => task.key !== taskId)
      }
      this.setState({ newEntry: updatedEntry });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header 
          updateState={this.updateState}
          username={this.state.username}
          entries={this.state.entries}
        />
        <Switch>
          <Route exact path="/" render={() => 
            <StartScreen
              entries={this.state.entries}
              addEntry={this.handleAddEntry}
              removeEntry={this.handleRemoveEntry}
            />
            }
          />
          <Route path="/timer" render={() => 
            <TimerScreen 
              newEntry={this.state.newEntry}
              actions={{
                addTask: this.handleAddTask,
                updateTask: this.handleUpdateTask,
                removeTask: this.handleRemoveTask,
                updateEntry: this.handleUpdateEntry,
                submitEntry: this.handleSubmitEntry,
              }}
            />
            } 
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App;