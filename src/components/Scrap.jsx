import React from 'react';
import _ from 'lodash';
import Table from '../table/Table';
import Cell from './Cell.jsx'
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
          var tableState = {table: new Table(json.cells, (cell) => cell.y, (cell) => cell.x, (cell, y) => cell.y = y, (cell, x) => cell.x = x, (cell) => cell.value = "")};
          var returnObj = Object.assign(prevState, tableState, json);
          console.log("Return obj:");
          console.log(returnObj);
          return returnObj;
        })
      });



      this.updateScrap = this.updateScrap.bind(this);
      this.updateCellOnScrap = this.updateCellOnScrap.bind(this);
      this.addRow = this.addRow.bind(this);
      this.addColumn = this.addColumn.bind(this);
  }

  updateCellOnScrap(cell) {
    var index = this.state.cells.findIndex(c => c.y === cell.y && c.x === cell.x);
    this.state.cells.splice(index, 1, cell);

    this.setState((prevState) => Object.assign(prevState, this.state));
    this.updateScrap();
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
        console.log("Updated scrap:");
        console.log(json);
        this.setState((prevState) => Object.assign(prevState, json))
      })
  }

  addRow() {
    this.state.cells = this.state.table.addRow().list;
    console.log(this.state);
    this.setState((prevState) => Object.assign(prevState, this.state));
    this.updateScrap();
  }

  addColumn() {
    this.state.cells = this.state.table.addColumn().list;
    console.log(this.state);
    this.setState((prevState) => Object.assign(prevState, this.state));
    this.updateScrap();
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
              this.state.table.sorted().rows()
                .map(rowArray => 
                  <tr key={rowArray[0].y}>
                    {rowArray.map(cell => <td><Cell key={cell.y + ":" + cell.x} data={cell} update={this.updateCellOnScrap}></Cell></td>)}
                  </tr>
                )
            }
          </tbody>
        </table>
        <div style={{textAlign: 'center', backgroundColor: 'rgb(186, 186, 186)', cursor: 'pointer'}} onClick={this.addRow}>
          + row
        </div>
        <div style={{textAlign: 'center', backgroundColor: 'rgb(186, 186, 186)', cursor: 'pointer'}} onClick={this.addColumn}>
          + column
        </div>
      </div>
    );
  }
}