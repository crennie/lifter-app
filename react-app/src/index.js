import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import store, { history } from './store'
import App from './containers/app'

import './index.css'

const target = document.querySelector('#root')

/*<App  />*/
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/*" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)