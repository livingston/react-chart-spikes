import React, { Component } from 'react';
import Scatter from './victoryCharts/scatter.js';
import { VictoryLegend, VictoryContainer } from 'victory';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (<main>
      <section className="chart-wrapper">
        <Scatter />
      </section>
    </main>);
  }
}

export default Home;
