import React from 'react';
import Scrap from './Scrap';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Test Page",
      scraps: {
        location: {
          x: 50,
          y: 50
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <Scrap />
      </div>
    );
  }
}