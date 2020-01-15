import React from 'react';

const StartButton = (props) => (
  <button id="startButton" onClick={ () => props.addProject() }>Start</button>
);

class RecentProjects extends React.Component {
  render() {
    return (
      <ul className="recordList">
        <h3>Recent Projects</h3>

        { this.props.projects.map( project =>
          <ProjectItem id={ project.id } 
                       key={ project.key }
                       title={ project.title } 
                       tasks={ project.tasks } 
                       timestamp={ project.timestamp } 
                       removeProject={ this.props.removeProject } />
        )}
      </ul>
    );
  }
}

export default RecentProjects;