import React from 'react';

class Project extends React.Component {

  state = {
    project: ''
  }

  render() {
    return (
      <input type="text" name="project" placeholder="Project" defaultValue={ this.state.project } onBlur={e => this.setState({ project: e.target.value })} />
    );
  }
}

export default Project;