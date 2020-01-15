import React from 'react';
import { Consumer } from './Context'; 
import EntryItem from './EntryItem';

const RecentEntries = () => {
  return (
    <Consumer>
      { context => (

          <ul className="recordList">
            <h3>Recent Entries</h3>
            <React.Fragment>
              { context.entries
                .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1 )
                .map( entry =>
                <EntryItem entry={ entry }
                             removeEntry={ context.actions.removeEntry } />
              )}
            </React.Fragment>
          </ul>

      )}
    </Consumer>
  );
}

export default RecentEntries;