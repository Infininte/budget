import React from 'react';

//expects an array called row
const Item = (props) => {
    return (
      <tr>
        {props.row.map(val => (
          <td>{val}</td>
        ))}
      </tr>
    );
  }

  export default Item;