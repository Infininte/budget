import React from 'react';
import _ from 'lodash';
import Table from '../table/Table';
// import Item from './Item.jsx';
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
      cells: [],
      table: new Table([], (cell) => cell.x, (cell) => cell.y)
    }

    fetch('http://localhost:8001/rest/scrap/' + this.props.name)
      .then(res => res.json())
      .then(json => {
        this.setState((prevState) => {
          var tableState = {table: new Table(json.cells, (cell) => cell.x, (cell) => cell.y)};
          var returnObj = Object.assign(prevState, tableState, json);
          console.log("Return obj:");
          console.log(returnObj);
          return returnObj;
        })
      });



      this.updateScrap = this.updateScrap.bind(this);
      this.updateItemOnScrap = this.updateItemOnScrap.bind(this);
      this.addRow = this.addRow.bind(this);
      this.getNextIndex = this.getNextIndex.bind(this);
  }

  updateItemOnScrap(body) {
    console.log(this.state);
    // this.state.items[body.index] = body;
    // this.setState((prevState) => Object.assign(prevState, this.state));
    // this.updateScrap();
  }

  updateScrap() {
    fetch('http://localhost:8001/rest/scrap/' + this.props.name, 
        {
          method: 'PUT', 
          body: JSON.stringify(this.state), 
          headers: { 'Content-Type': 'application/json' }
        })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState((prevState) => Object.assign(prevState, json))
      })
  }

  addRow() {
    // var emptyRow = Object.assign({}, this.state.items[0]);
    // Object.keys(emptyRow).forEach(key => emptyRow[key] = "");

    // emptyRow.index = this.getNextIndex();
    // delete emptyRow._id;
    
    // console.log(emptyRow)
    // fetch('http://localhost:8001/rest/scrap/' + this.props.name + "/item", 
    //     {
    //       method: 'POST', 
    //       body: JSON.stringify(emptyRow), 
    //       headers: { 'Content-Type': 'application/json' }
    //     })
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json);
    //     this.setState((prevState) => Object.assign(prevState, json))
    //   })
  }

  getNextIndex() {
    // var indexes = this.state.items.map(row => row.index).filter(val => val !== null && val !== undefined);
    // var maxIndex = Math.max(...indexes);
    // return maxIndex + 1;
  }

  render() {
    return (
      <div style={{position: 'absolute', top: this.state.y_loc + 'px', left: this.state.x_loc + 'px', padding: '10px'}}>
        <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{this.state.name}</span>
        <table style={tableStyle}>
          {/* <thead>
          </thead> */}
          <tbody>
            {
              // this.state.items.map(rowObj => 
              //   <Item key={rowObj.index} row={rowObj} updateItemOnScrap={this.updateItemOnScrap} columnMeta={this.state.columnMeta}/>
              // )
              this.state.table.sorted().rows()
                .map(rowArray => 
                  <tr>
                    {rowArray.map(cell => <td>{cell.value}</td>)}
                  </tr>
                )
            }
          </tbody>
        </table>
        <div style={{textAlign: 'center', backgroundColor: 'rgb(186, 186, 186)', cursor: 'pointer'}} onClick={this.addRow}>
          +
        </div>
      </div>
    );
  }
}