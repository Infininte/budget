import React from 'react';
import Item from './Item';


export default class Scrap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    setTimeout(() => {
      console.log("Getting an item!");
      this.setState((prevState) => {
        prevState.items.push({item: "wine", amount: 300})
        return {items: prevState.items}
      })
      console.log("Got an item: " + this.state.items)
      setTimeout(() => {
        console.log("Getting another item!");
        this.setState((prevState) => {
          prevState.items.push({item: "food", amount: 72})
          return {items: prevState.items}
        })
        console.log("Got an item: " + this.state.items)
      }, 3000);
    }, 3000);
  }


  render() {
    return (
      <div>
        <h3>This is a scrap!</h3>
        <table style={tableStyle}>
          <tr>
            {
              Object.keys(this.state.items[0] || {}).map(colTitle => 
                <th>{colTitle}</th>
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