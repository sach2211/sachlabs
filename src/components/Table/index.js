import React, { PureComponent } from 'react';

export default class Table extends PureComponent {
  render() {
    return (
      <table>
        {
          this.props.data.map((thisRow) => (
            <TableRow rowData={thisRow} />
          ))
        }
      </table>
    );
  }
}

class TableRow extends PureComponent {
  render() {
    return (
      <tr>
      {
        Array.isArray(this.props.rowData)
        ? this.props.rowData.map((value) => (
          <td>
            {value}
          </td>
        ))
        : (
          <td>
            {this.props.rowData}
          </td>
        )
      }
      </tr>
    );
  }
}