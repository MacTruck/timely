import React from 'react';

import Timer from './Timer';
// import StopSaveButton from './StopSaveButton';
import RecordForm from './RecordForm';

const ProjectScreen = (props) => {
	
	return (
	  <div>
	    <Timer />
	    <RecordForm project={ props.project }
	    			saveProject={ props.saveProject } />
	  </div>
	);
}

export default ProjectScreen;