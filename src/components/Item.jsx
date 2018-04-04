import React from 'react';

const tdStyle = {
  padding: '1px 5px'
}

//expects an object called row
export default class Item extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      row: this.attachOrdering(this.props.row, this.props.columnMeta)
    }

    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.attachOrdering = this.attachOrdering.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState((prevState) => {
      prevState.row.filter(cellObj => cellObj.name === name)[0].value = value;
      return prevState;
    })
  }

  onBlur(event) {
    // console.log(this.state.row.reduce((acc, cur) => Object.assign(acc, this.createSimpleObj(cur.name, cur.value)), {}));
    this.props.updateItemOnScrap(this.state.row.reduce((acc, cur) => Object.assign(acc, this.createSimpleObj(cur.name, cur.value)), {}));
  }

  getColumnOrderingObj(columnMeta) {
    var ordering = {};
    columnMeta.forEach((col) => ordering[col.name] = col.order)
    return ordering;
  }

  attachOrdering(rowObj, columnMeta) {
    //TODO remove this once the model is corrected
    var cellObjs = this.stripToProperFormat(rowObj);

    columnMeta.forEach(meta => cellObjs.filter(cellObjs => cellObjs.name === meta.name)[0].order = meta.order);
    return cellObjs;
  }

  //Outputs a list of cell objs
  stripToProperFormat(rowObj) {
    return Object.entries(rowObj)
            .reduce((acc, curr) => acc.concat({name: curr[0], value: (curr[1] == null ? "" : curr[1])}), []);
  }

  createSimpleObj(key, value){
    var obj = {};
    obj[key] = value;
    return obj;
  }

  render() {
    return (
      <tr>
        {this.state.row
            .filter(entry => entry.name !== 'index' && entry.name[0] !== "_")
            .sort((entryA, entryB) => 
          entryA.order - entryB.order
        ).map(entry => (
          <td style={tdStyle}><input type="text" name={entry.name} value={entry.value} onChange={this.handleChange} onBlur={this.onBlur}/></td>
        ))}
      </tr>
    );
  }
}