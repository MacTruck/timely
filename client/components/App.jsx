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
      email: '',
      name: '',
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
    this.setState(data, () => console.log('state: ', this.state));
  }

  handleRemoveEntry(id) {
    // this.db
    //   .collection('entries')
    //   .deleteOne({ id })
    //   .then(console.log('Successfully deleted entry'))
    //   .then(() => this.updateEntries())
    //   .catch(console.error);
  }

  handleAddEntry(entryTitle = 'Project / Client') {
    let entrieslength = this.state.entries.length;
    let timestamp = new Date().getTime();
    let newEntry = {
      key: entrieslength,
      id: entrieslength,
      title: entryTitle,
      tasks: [
        {
          key: this.state.taskKeyMaker += 1,
          content: ''
        }
      ],
      timestamp: timestamp,
      elapsedTime: null
    }
    this.setState({ newEntry });
  }

  handleUpdateEntry(currentEntry, entryData, updateProperty) {
    currentEntry[updateProperty] = entryData;
    this.setState({ newEntry: currentEntry });
  }

  handleSubmitEntry() {
    // upload the newEntry object into the remote database
    // then update the entries array in state
    // this.db
    //   .collection('entries')
    //   .insertOne(this.state.newEntry)
    //   .then(console.log('Successfully loaded new entry'))
    //   .then(() => this.updateEntries())
    //   .catch(console.error);
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