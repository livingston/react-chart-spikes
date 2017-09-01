import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

import VictoryCharts from './victoryCharts';
import RumbleCharts from './rumbleCharts';
import ReCharts from './rechartCharts';
import D3Charts from './d3Charts';
import Final from './final';

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
            <li><NavLink exact={true} to="/">Dashboard</NavLink></li>
            <li><NavLink to="/recharts">Recharts</NavLink></li>
            <li><NavLink to="/victory">Victory</NavLink></li>
            {/* <li><NavLink to="/rumble">Rumble</NavLink></li> */}
            {/* <li><NavLink to="/d3">D3</NavLink></li> */}
          </ul>
        </nav>

        <article>
          <Switch>
            <Route exact path="/" component={Final}/>
            <Route path="/rumble" component={RumbleCharts}/>
            <Route path="/recharts" component={ReCharts}/>
            <Route path="/d3" component={D3Charts}/>
            <Route path="/victory" component={VictoryCharts}/>
            <Route component={NotFound}/>
          </Switch>
        </article>
      </main>
    </Router>);
  }
}

export default Home;
