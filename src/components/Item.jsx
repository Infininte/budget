import React from 'react';

const tdStyle = {
  padding: '1px 5px'
}

//expects an object called row
export default class Item extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      row: this.props.row
    }

    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState((prevState) => {
      // console.log(prevState);
      prevState.row[name] = value;
      return prevState;
    })
  }

  onBlur(event) {
    this.props.updateScrap(this.state.row);
  }

  render() {
    return (
      <tr>
        {Object.entries(this.props.row).map(entry => (
          <td style={tdStyle}><input type="text" name={entry[0]} value={entry[1]} onChange={this.handleChange} onBlur={this.onBlur}/></td>
        ))}
      </tr>
    );
  }
}