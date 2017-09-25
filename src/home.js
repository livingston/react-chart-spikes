import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

import Final from './final';
import AgGrid from './articleDetails/agGrid';

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
            <li><NavLink to="/article-details">Article Details</NavLink></li>
          </ul>
        </nav>

        <article>
          <Switch>
            <Route exact path="/" component={Final}/>
            {<Route exact path="/article-details" component={AgGrid}/>}
            <Route component={NotFound}/>
          </Switch>
        </article>
      </main>
    </Router>);
  }
}

export default Home;
