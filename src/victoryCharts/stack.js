import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryTheme,
  VictoryContainer, VictoryTooltip, VictoryLegend,
  VictoryStack, VictoryBar } from 'victory';
import { maxBy, minBy, transform } from 'lodash';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

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
}
];

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

    const articles = Object.keys(data[0].articles);
    const categories = {
      x: data.map(d => d.label)
    };

    const transformedData = articles.map(article => data.map(d => ({
      x: d.label,
      y: d.articles[article],
      label: `${d.label} - ${article} - ${d.articles[article]}`
    })));

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Stacked Bar Chart</h3>
        <VictoryLegend
          width={width}
          theme={VictoryTheme.material}
          data={articles.map(article => ({ name: article }))}
          orientation="horizontal"
          padding={{ top: 50, left: 50 }}
          containerComponent={<VictoryContainer responsive={false} />}
        />
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <VictoryChart
            width={width} height={height}
            theme={VictoryTheme.material}
            containerComponent={<VictoryContainer responsive={false}/>}
            domainPadding={{ x: 60 }}
          >
            <VictoryStack
              categories={categories}
            >
              {transformedData.map((d, i) => (<VictoryBar
                data={d} key={i}
                labelComponent={<VictoryTooltip renderInPortal/>}
              />))}
            </VictoryStack>
          </VictoryChart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Stack;
