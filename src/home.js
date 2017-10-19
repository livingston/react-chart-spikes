import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

import Final from './final';
import ArticleDetailsFDT from './articleDetails/fixedDataTable';
import AgGrid from './articleDetails/agGrid';
import Colli from './final/colli';

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
            <li><NavLink to="/fixed-data-table">Fixed Data Table</NavLink></li>
            <li><NavLink to="/ag-grid">Ag Grid</NavLink></li>
            <li><NavLink to="/colli">Colli</NavLink></li>
          </ul>
        </nav>

        <article>
          <Switch>
            <Route exact path="/" component={Final}/>
            {<Route exact path="/fixed-data-table" component={ArticleDetailsFDT}/>}
            {<Route exact path="/ag-grid" component={AgGrid}/>}
            {<Route exact path="/colli" component={Colli}/>}
            <Route component={NotFound}/>
          </Switch>
        </article>
      </main>
    </Router>);
  }
}

export default Home;
