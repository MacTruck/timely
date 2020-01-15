import React from 'react';
import {
	Stitch,
	AnonymousCredential,
	RemoteMongoClient
} from "mongodb-stitch-browser-sdk";

const AppContext = React.createContext();

export class Provider extends React.Component {

	state = {
		entries: [],
		newEntry: {}
	};

	componentDidMount() {
		// initialize the app client
		this.client = Stitch.initializeDefaultAppClient("timely-wtjag");
		// get a mongodb service client used for logging in and communicating with stitch
		const mongodb = this.client.getServiceClient(
			RemoteMongoClient.factory,
			'mongodb-atlas'
		);
		// get a reference to the timely database
		this.db = mongodb.db('timely');
		this.updateEntriesOnLoad();
	}

	updateEntries() {
		// query the remote database and update the component state
		this.db
			.collection('entries')
			.find({}, { limit: 1000 })
			.asArray()
			.then(entries => {
				this.setState({ entries });
			});
	}

	updateEntriesOnLoad() {
		// anonymously log in and display entries on load
		this.client.auth
			.loginWithCredential(new AnonymousCredential())
			.then(() => this.updateEntries())
			.catch(console.error);
	}

	handleSubmitEntry = () => {
		// upload the newEntry object into the remote database
		// then update the entries array in state
		this.db
			.collection('entries')
			.insertOne(this.state.newEntry)
			.then(console.log('Successfully loaded new entry'))
			.then(() => this.updateEntries())
			.catch(console.error);
	}

	handleRemoveEntry = (id) => {
		this.db
			.collection('entries')
			.deleteOne({ id })
			.then(console.log('Successfully deleted entry'))
			.then(() => this.updateEntries())
			.catch(console.error);
	}

	taskKeyMaker = 0;

	handleAddEntry = (entryTitle = 'Entry / Client') => {
		let entrieslength = this.state.entries.length;
		let timestamp = new Date().getTime();
		let newEntry = {
			key: entrieslength,
			id: entrieslength,
			title: entryTitle,
			tasks: [
				{
					key: this.taskKeyMaker += 1,
					content: ''
				}
			],
			timestamp: timestamp,
			elapsedTime: null
		}
		this.setState({ newEntry });
	}

	handleUpdateEntry = (currentEntry, entryData, updateProperty) => {
		currentEntry[updateProperty] = entryData;
		this.setState({ newEntry: currentEntry });
	}

	handleUpdateTask = (currentEntry, taskData, taskKey) => {
		currentEntry.tasks = currentEntry.tasks.map( task => task.key === taskKey ? { ...task, content: taskData } : task );
		this.setState({ newEntry: currentEntry });
	}

	handleAddTask = (currentEntry) => {
		if (currentEntry.tasks[(currentEntry.tasks.length - 1)].content !== '' ) {
			currentEntry.tasks.push({ key: this.taskKeyMaker += 1, content: '' });
			this.setState({ newEntry: currentEntry });
		}
	}

	handleRemoveTask = (currentEntry, taskId) => {
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
			<AppContext.Provider value={{ 
					entries: this.state.entries,
					newEntry: this.state.newEntry,
					actions: {
						addEntry: this.handleAddEntry,
						updateEntry: this.handleUpdateEntry,
						submitEntry: this.handleSubmitEntry,
						removeEntry: this.handleRemoveEntry,
						addTask: this.handleAddTask,
						updateTask: this.handleUpdateTask,
						removeTask: this.handleRemoveTask
					}
			}}>
				{ this.props.children }
			</AppContext.Provider>
		);
	}
}

export const Consumer = AppContext.Consumer;