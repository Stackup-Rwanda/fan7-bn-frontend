import React from 'react';
import './styles.scss';

class Table extends React.Component {
  render() {
    console.log(this.props.requests);

    return (
      <div className="mainTable">
        <table className="mainTable_table">
          <tr className="mainTable_table_tr">
            <th className="mainTable_table_th">Trip Name</th>
            <th className="mainTable_table_th">Current Location</th>
            <th className="mainTable_table_th">Travel Date</th>
            <th className="mainTable_table_th">Return Date</th>
            <th className="mainTable_table_th">Status</th>
            <th className="mainTable_table_th">Action</th>
          </tr>

          {this.props.requests &&
            this.props.requests.map(request => (
              <tr key={request.id} className="mainTable_table_tr">
                <td className="mainTable_table_td">{request.reason}</td>
                <td className="mainTable_table_td">{request.origin}</td>
                <td className="mainTable_table_td">{request.travel_date}</td>
                <td className="mainTable_table_td">{request.return_date}</td>
                <td className="mainTable_table_td">{request.status}</td>
                <td className="mainTable_table_td">
                  <button
                    disabled={request.status !== 'Pending'}
                    onClick={() => this.props.togglePopup(request)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    );
  }
}

export default Table;
