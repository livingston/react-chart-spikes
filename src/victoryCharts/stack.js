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
      width: 0,
      height: 0
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

    const categories = data.map(d => d.label);

    const transformedData = data.map((d) => transform(d.articles, (result, value, key) => {
      result.push({
        x: key,
        y: value
      });
    }, []));

    console.log(transformedData.length);

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        {/* <VictoryLegend
          width={width}
          height={50}
          data={[
            {name: 'Competitor 1', symbol: { type: 'circle', fill: '#f00'} },
            {name: 'Competitor 2', symbol: { type: 'circle', fill: '#00f'} }
            ]}
          orientation="horizontal"
          containerComponent={<VictoryContainer responsive={false} />}
        /> */}
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <VictoryChart
            width={width} height={height}
            theme={VictoryTheme.material}
            containerComponent={<VictoryContainer responsive={false}/>}
            domainPadding={60}
          >
            <VictoryStack categories={categories}>
              {transformedData.map((d, i) => (<VictoryBar data={d} key={i} />))}
            </VictoryStack>
          </VictoryChart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Stack;
