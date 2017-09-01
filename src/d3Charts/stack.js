import React, { Component } from 'react';
import { stack } from 'd3-shape';
import { scaleLinear, scaleBand, scaleOrdinal, schemeCategory20b } from 'd3-scale';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const data = [{
  label: 'Competitor 1',
  electronics: chance.integer({min: 0, max: 1000}),
  food: chance.integer({min: 0, max: 1000}),
  grocery: chance.integer({min: 0, max: 1000})
}, {
  label: 'Competitor 2',
  electronics: chance.integer({min: 0, max: 1000}),
  food: chance.integer({min: 0, max: 1000}),
  grocery: chance.integer({min: 0, max: 1000})
}, {
  label: 'Competitor 3',
  electronics: chance.integer({min: 0, max: 1000}),
  food: chance.integer({min: 0, max: 1000}),
  grocery: chance.integer({min: 0, max: 1000})
}, {
  label: 'Competitor 4',
  electronics: chance.integer({min: 0, max: 1000}),
  food: chance.integer({min: 0, max: 1000}),
  grocery: chance.integer({min: 0, max: 1000})
}];


class Stack extends Component {
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

    const articles = Object.keys(data[0]).slice(1);
    const stackData = stack().keys(articles)(data);

    const colorScale = scaleOrdinal(schemeCategory20b)
      .domain(articles);
    const xScale = scaleBand().rangeRound([0, width])
      .domain(data.map(d => d.label));
    const yScale = scaleLinear().rangeRound([height, 0]);

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Stacked Bar Chart</h3>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
        <svg width={width} height={height}>
          <g>

          </g>
        </svg>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Stack;
