import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div>
      <h1>BCPA Meets</h1>
        {this.props.meets.map(meet =>
          <p key={meet._id}><a href={`/meet/${meet._id}`}>{meet.name}</a></p>
        )}
      </div>
    );
  }
}

export default Home;