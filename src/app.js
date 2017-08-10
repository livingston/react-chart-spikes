import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Home from 'home';

const NotFound = ({ location }) => (
  <div>
    <h3>404 – <code>{location.pathname}</code> Not Found!</h3>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
);

render(
  <App />,
  document.getElementById('app')
);
