import React, { Component } from 'react';
import axios from 'axios';

import Nav from '../components/Nav';
import AttendanceMatch from '../components/AttendanceMatch';

class AttendanceMatching extends Component {
  state = { matches: [] };

  componentWillMount() {
    const { id } = this.props.match.params;

    axios.get(`/events/imports/${id}/attendances.json`)
      .then((response) => {
        this.setState({ matches: response.data });
      });
  }

  renderRows() {
    const { matches } = this.state;
    return matches.map((match) => {
      return <AttendanceMatch match={match} key={match.fb_rsvp.id} />
    });
  }

  render() {
    return (
      <div>
        <Nav activeTab='events'/>

        <h2>Match Event Participants</h2>

        <br/>

        <table className='table'>
          <thead>
            <tr>
              <th colSpan='3'>Facebook Event RSVPS</th>
              <th colSpan='2'>Affinity RSVPS</th>
            </tr>
          </thead>

          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AttendanceMatching;
