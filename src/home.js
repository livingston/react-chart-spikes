import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import VictoryCharts from './victoryCharts';

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
          </Switch>
        </article>
      </main>
    </Router>);
  }
}

export default Home;
