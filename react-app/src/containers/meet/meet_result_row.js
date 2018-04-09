import React, { Component } from 'react'
//import api from '../../modules/api';

const _header_columns = ["lifter_id", "Cat.", "B/W", "Cls.", "SQ1", "SQ2", "SQ3", "BP1", "BP2", "BP3", "DL1", "DL2", "DL3"];
const _lifting_columns = ["SQ1", "SQ2", "SQ3", "BP1", "BP2", "BP3", "DL1", "DL2", "DL3"];

class MeetResultRow extends Component {
  static buildHeaderRow() {
    return (
      <tr>
        {_header_columns.map(col_name => {
          return <th key={col_name}>{col_name === 'lifter_id' ? "Lifter" : col_name}</th>;
        })}
      </tr>
    );
  };

  getTableCellClass(col_name) {
    // Get the styling for if the value is a 
    const val = this.props.row[col_name];
    if (!val) { return '' }

    if (_lifting_columns.includes(col_name)) {
      if (val.startsWith('-')) {
        if (val.length > 1) {
          return 'missed-lift';
        } else {
          return 'passed-lift';
        }
      } else {
        return 'good-lift';
      }
    } else {
      return '';
    }
    
  };

  getTableCellData(col_name) {
    const val = this.props.row[col_name];
    if (!val) { return '' }
    
    if (col_name === 'lifter_id') {
      const lifter = this.props.lifters.find(lifter=> String(lifter._id) === String(val)),
        lifter_name = lifter.Name;
      return lifter_name;
    } else if (_lifting_columns.includes(col_name)) {
      return val.replace(/-/g, '');
    } else {
      return val;
    }
  };

  render() {
    return (
      <tr>
        {_header_columns.map(col_name =>
          <td key={col_name} className={this.getTableCellClass(col_name)}>{this.getTableCellData(col_name)}</td>
        )}
      </tr>
    );
  }
}

export default MeetResultRow;

