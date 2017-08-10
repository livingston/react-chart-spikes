import React, { Component } from 'react';
import { ScatterChart, Scatter, CartesianGrid, Tooltip, Legend,
 XAxis, YAxis, ZAxis, ReferenceLine, ReferenceDot, ReferenceArea, ErrorBar } from 'recharts';
import { maxBy, minBy, groupBy } from 'lodash';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const scatterDatum = () => ({
  x: chance.integer({min: 0, max: 1000}),
  y: chance.integer({min: 0, max: 1000}),
  competitor: chance.pickone(['c1', 'c2'])
});
const data = Array.apply(null, Array(100)).map(scatterDatum);

class RScatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100
    };
  }

  componentDidMount() {
    this.updateDimensions();
  }

  updateDimensions = () => {
    this.setState({
      width: this.node.clientWidth,
      height: this.node.clientHeight
    });
  }

  render() {
    const { width, height } = this.state;

    const minX = minBy(data, (d) => d.x).x;
    const maxX = maxBy(data, (d) => d.x).x;
    const minY = minBy(data, (d) => d.y).y;
    const maxY = maxBy(data, (d) => d.y).y;

    const groupedData = groupBy(data, 'competitor');

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Scatter Plot</h3>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <ScatterChart width={width} height={height} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" tickCount={10} />
            <YAxis dataKey="y" tickCount={10} />
            <Scatter name='Competitor 1' data={groupedData.c1} fill='#f00' />
            <Scatter name='Competitor 2' data={groupedData.c2} fill='#00f' />
             <Tooltip cursor={{strokeDasharray: '3 3'}}/>
             <Legend/>
          </ScatterChart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default RScatter;
