import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import VictoryCharts from './victoryCharts';

const NotFound = ({ location }) => (
  <div>
    <h3>404 – <code>{location.pathname}</code> Not Found!</h3>
  </div>
)

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (<Router>
      <main>
        <nav>
          <ul>
            <li><NavLink exact={true} to="/">Victory</NavLink></li>
            <li><NavLink to="/rumble">Rumble</NavLink></li>
          </ul>
        </nav>

        <article>
          <Switch>
            <Route exact path="/" component={VictoryCharts}/>
            <Route component={NotFound}/>
          </Switch>
        </article>
      </main>
    </Router>);
  }
}

export default Home;
