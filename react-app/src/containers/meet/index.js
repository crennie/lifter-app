import React, { Component } from 'react'
import MeetResultRow from './meet_result_row'

class Meet extends Component {

  getMeetDetails() {
    console.log(this.props, this.props && this.props.match && this.props.match.params)
    if (this.props && this.props.match && this.props.match.params) { 
      const meet_id = this.props.match.params.meet_id;
      return this.props.meets.find(meet => String(meet._id) === String(meet_id));
    } else {
      return {};
    }
  }
  render() {
    let meet_details = this.getMeetDetails();
    meet_details = meet_details || {};
    meet_details.results = meet_details.results || [];

    console.log(MeetResultRow.prototype.header_columns);
    return (
      <div>
      <h1>Meet Details</h1>
        {console.log(this.props, meet_details)}
        <h2>{meet_details.name}, {meet_details.start_date}</h2>
        <table>
        <thead>
          {MeetResultRow.buildHeaderRow()}
        </thead>
        <tbody>
          { meet_details.results.map(meet_result =>
            <MeetResultRow key={meet_result._id} row={meet_result} lifters={this.props.lifters} />
          )}
        </tbody>
        </table>
      </div>
    );
  }
}

export default Meet;