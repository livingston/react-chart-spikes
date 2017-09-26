import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { LicenseManager } from "ag-grid-enterprise/main";

import './styles/app.scss';

import Home from 'home';

LicenseManager.setLicenseKey("ag-Grid_Evaluation_License_Not_for_Production_1Devs15_November_2017__MTUxMDcwNDAwMDAwMA==3c862d06679ff2da4f8d4ac677bff980");

const App = () => (<Router>
  <Home />
</Router>);

render(
  <App />,
  document.getElementById('app')
);
