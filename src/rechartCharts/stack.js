import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

// Test data
require('chance');

const data = [{
  label: 'Competitor 1',
  articles: {
    electronics: chance.integer({min: 0, max: 1000}),
    food: chance.integer({min: 0, max: 1000}),
    grocery: chance.integer({min: 0, max: 1000})
  }
}, {
  label: 'Competitor 2',
  articles: {
    electronics: chance.integer({min: 0, max: 1000}),
    food: chance.integer({min: 0, max: 1000}),
    grocery: chance.integer({min: 0, max: 1000})
  }
}, {
  label: 'Competitor 3',
  articles: {
    electronics: chance.integer({min: 0, max: 1000}),
    food: chance.integer({min: 0, max: 1000}),
    grocery: chance.integer({min: 0, max: 1000})
  }
}, {
  label: 'Competitor 4',
  articles: {
    electronics: chance.integer({min: 0, max: 1000}),
    food: chance.integer({min: 0, max: 1000}),
    grocery: chance.integer({min: 0, max: 1000})
  }
}];


class RStack extends Component {
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

    const articles = Object.keys(data[0].articles).map(article => ({ label: article, key: `articles.${article}`, color: chance.color({format: 'hex'}) }));

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Scatter Plot</h3>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <BarChart width={width} height={height} data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />

            {articles.map((article, i) => (<Bar dataKey={article.key} name={article.label} stackId="a" key={i} fill={article.color} />))}
          </BarChart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default RStack;
