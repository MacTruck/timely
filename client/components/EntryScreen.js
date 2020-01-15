import React from 'react';
import { Consumer } from './Context'; 

class EntryScreen extends React.Component {
  state = {}

  componentDidMount() {
    console.log(this.context);
  }
  // let id = match.params.id;
  render() {
  return (
    <Consumer>
      { context => (
        // let entry = context.entries.filter(entry => entry.id === id);
            <React.Fragment>
              { context.entries.map( entry =>
                  <ul className="recordList">
            {/*      <h2>{ id }</h2>    */}
                  <h2>{ entry.title }</h2>
            {/*      <h3>{ this.props.entry.title }</h3>
                    { this.props.entry.tasks.map( task =>
                      <li>{ task }</li>
                    )}
            */}
                </ul>
              )}
            </React.Fragment>
      )}
    </Consumer>
  )}
}

export default EntryScreen;