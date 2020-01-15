		entries: [
			{
				key: 2,
				id: 2,
				title: 'Gotta Be Quick',
				tasks: [
				  {
				    key: 100,
				    content: 'Questionable outcomes...'
				  }
				],
				timestamp: 1533333333333,
				elapsedTime: 5525
			},
		    {
			    key: 1,
			    id: 1,
			    title: 'Bonifide',
			    tasks: [
			      {
			        key: 110,
			        content: 'Added altruism points...'
			      }
			    ],
			    timestamp: 1522222222222,
			    elapsedTime: 5525
		  	},
		  	{
			    key: 0,
			    id: 0,
			    title: 'Diabetes is a killer',
			    tasks: [
			      {
			        key: 120,
			        content: 'Alternated hot & cool...'
			      },
			      {
			        key: 121,
			        content: 'Some other thing'
			      },
			      {
			        key: 122,
			        content: 'Maybe one more just to be safe'
			      }
			    ],
			    timestamp: 1444444444444,
			    elapsedTime: 5525
		  	}
		]


	// --- OLD HANDLE ENTRY FUNCTION
	handleAddEntry = (entryTitle = 'Entry / Client') => {
	let entrieslength = this.state.entries.length;
	let timestamp = new Date().getTime();
	let newEntry = [
		{
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
	]
		this.setState( prevState => {
			return {
				entries: newEntry.concat(prevState.entries)
			};
		});
	}

	// --- OLD HANDLE UPDATE ENTRY
	handleUpdateEntry = (currentEntry, entryData, updateProperty) => {
		currentEntry[updateProperty] = entryData;
		this.setState({
			entries: this.state.entries.map( entry => (entry.id === currentEntry.id ? currentEntry : entry ))
		});
	}

	// --- OLD REMOVE ENTRY
	handleRemoveEntry = (id) => {
		this.setState( prevState => {
			return {
				entries: prevState.entries.filter( entry => entry.id !== id )
			};
		});
	}