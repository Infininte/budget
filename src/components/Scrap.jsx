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

    fetch('http://localhost:8001/rest/scrap/Food')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState((prevState) => Object.assign(prevState, json))
      });
  }


  render() {
    return (
      <div style={{position: 'absolute', top: this.state.x_loc + 'px', left: this.state.y_loc + 'px', padding: '10px'}}>
        <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{this.state.name}</span>
        <table style={tableStyle}>
          <tr>
            {
              Object.keys(this.state.items[0] || {}).map(colTitle => 
                <th style={thStyle}>{colTitle}</th>
              )
            }
          </tr>
          {
            this.state.items.map(rowObj => 
              <Item row={Object.values(rowObj)} />
            )
          }
        </table>
      </div>
    );
  }
}