import React from 'react';

const tdStyle = {
  padding: '1px 5px'
}

//expects an object called row
export default class Cell extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.props.data;

    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.attachOrdering = this.attachOrdering.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState((prevState) => {
      prevState.value = value;
      return prevState;
    })
  }

  onBlur(event) {
    this.props.update(this.state);
  }

  getColumnOrderingObj(columnMeta) {
    // var ordering = {};
    // columnMeta.forEach((col) => ordering[col.name] = col.order)
    // return ordering;
  }

  attachOrdering(rowObj, columnMeta) {
    //TODO remove this once the model is corrected
    // var cellObjs = this.stripToProperFormat(rowObj);

    // columnMeta.forEach(meta => cellObjs.filter(cellObjs => cellObjs.name === meta.name)[0].order = meta.order);
    // return cellObjs;
  }

  //Outputs a list of cell objs
  stripToProperFormat(rowObj) {
    // return Object.entries(rowObj)
    //         .reduce((acc, curr) => acc.concat({name: curr[0], value: (curr[1] == null ? "" : curr[1])}), []);
  }

  createSimpleObj(key, value){
    // var obj = {};
    // obj[key] = value;
    // return obj;
  }

  render() {
    return (
        <input type="text" value={this.state.value} onChange={this.handleChange} onBlur={this.onBlur}/>
    );
  }
}