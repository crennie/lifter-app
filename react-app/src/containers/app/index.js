import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Meet from '../meet';

import api from '../../modules/api';


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}
const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends React.Component {

  state = {
    meets: [],
    lifters: []
  };
   
  componentDidMount() {
    /*
    const getMeetsPromise = (api.getMeets()
        .then(response => this.setState({ meets: response }))
        .catch(err => console.log(err))),
      getLiftersPromise = (api.getLifters()
        .then(response => this.setState({ lifters: response }))
        .catch(err => console.log(err)));
    */
    
    Promise.all([api.getMeets(), api.getLifters()]).then((responses) => {
      console.log(responses, this);
      this.setState({
        meets: responses[0],
        lifters: responses[1]
      });
    }).catch(err => console.log(err))
  };

  render() {
    console.log(this.props.location.pathname);
    return (
      <div>
        <header>
          {this.props.location.pathname === '/' ? [] : <Link to="/">All Meets</Link>}
        </header>

        <main>
          <PropsRoute exact path="/" component={Home} meets={this.state.meets} />
          <PropsRoute exact path="/meet/:meet_id" component={Meet} meets={this.state.meets} lifters={this.state.lifters} />
        </main>
      </div>)
  }
}

export default App;