import React from 'react';
import Item from './Item.jsx';
const fetch = require('node-fetch');

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse'
}
const thStyle = {
  padding: '3px 5px'
}

export default class Scrap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    fetch('http://localhost:8001/rest/scrap/' + this.props.name)
      .then(res => res.json())
      .then(json => {
        this.setState((prevState) => Object.assign(prevState, json))
      });

      this.updateScrap = this.updateScrap.bind(this);
  }

  updateScrap(body) {
    this.state.items[body.index] = body;
    console.log(this.state);
    fetch('http://localhost:8001/rest/scrap/' + this.props.name, 
        {
          method: 'PUT', 
          body: JSON.stringify(this.state), 
          headers: { 'Content-Type': 'application/json' }
        })
      .then(res => res.json)
      .then(json => {
        console.log(json);
        this.setState((prevState) => Object.assign(prevState, json))
      })
  }


  render() {
    return (
      <div style={{position: 'absolute', top: this.state.x_loc + 'px', left: this.state.y_loc + 'px', padding: '10px'}}>
        <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{this.state.name}</span>
        <table style={tableStyle}>
          <thead>
            <tr>
              {
                Object.keys(this.state.items[0] || {}).map(colTitle => 
                  <th key={colTitle} style={thStyle}>{colTitle}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              this.state.items.map(rowObj => 
                <Item key={rowObj.index} row={rowObj} updateScrap={this.updateScrap} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}