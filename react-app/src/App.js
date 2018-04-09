import React, { Component } from 'react';
import './App.css';



class App extends Component {
  state = {
    meets: []
  };

  getMeets() {
    this.callApi('/api/meets')
      .then(response => this.setState({ meets: response }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getMeets();
  };

  callApi = async(api_url) => {
    const response = await fetch(api_url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  //<p className="App-intro">{this.state.response}</p>
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sample React app</h1>
        </header>

        {this.state.meets.map(meet =>
          <p><span href={`/meet/${meet._id}`}>{meet.name}</span></p>
        )}
      </div>
    );
  }
}

export default App;
