import React from 'react';

const tdStyle = {
  padding: '1px 5px'
}

//expects an array called row
const Item = (props) => {
    return (
      <tr>
        {props.row.map(val => (
          <td style={tdStyle}>{val}</td>
        ))}
      </tr>
    );
  }

  export default Item;