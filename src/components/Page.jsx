import React from 'react';
import Scrap from './Scrap.jsx';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Test Page",
      scraps: ["Food", "Fun"]
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        {this.state.scraps.map(name => 
          <Scrap key={name} name={name} />
        )}
      </div>
    );
  }
}