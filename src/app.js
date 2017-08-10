import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import './styles/app.scss';

import Home from 'home';

const App = () => (<Router>
  <Home />
</Router>);

render(
  <App />,
  document.getElementById('app')
);
