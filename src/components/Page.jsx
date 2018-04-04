import React from 'react';
import Scrap from './Scrap.jsx';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "main",
      scraps: []
    }
  
    fetch('http://localhost:8001/rest/page/' + this.state.name)
      .then(res => res.json())
      .then(json => {
        this.setState((prevState) => Object.assign(prevState, json))
      });

      this.addPage = this.addPage.bind(this);
  }

  addPage() {
    fetch('http://localhost:8001/rest/page/' + this.state.name + "/scrap",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      .then(res => res.json())
      .then(json => {
        this.setState((prevState) => Object.assign(prevState, json))
      });
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <div style={{textAlign: 'center', backgroundColor: 'rgb(186, 186, 186)', cursor: 'pointer'}} onClick={this.addPage}><h2>+</h2></div>
        <div>
          {this.state.scraps.map(name => 
            <Scrap key={name} name={name} />
          )}
        </div>
      </div>
    );
  }
}