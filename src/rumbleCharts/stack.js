import React, { Component } from 'react';
import { Chart, Layer, Bars, Transform, Ticks } from 'rumble-charts';
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
}];

const series = [{
    data: [1, 2, 3, 1]
}, {
    data: [5, 7, 11, 2]
}, {
    data: [13, 17, 19, 3]
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

    const articles = Object.keys(data[0].articles);
    const xLabels = data.map(d => d.label);

    const transformedData = articles.map(article => ({
      data: data.map(d => d.articles[article])
    }));

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Stacked Bar Chart</h3>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <Chart width={width} height={height} series={transformedData}>
            <Layer width='85%' height='85%'>
              <Ticks
                axis='y'
                ticks={{maxTicks: 10}}
                lineLength='100%'
                lineVisible={true}
                lineVisible
                labelStyle={{textAnchor:'end',dominantBaseline:'middle'}}
                labelAttributes={{x: -20}}
              />
              <Ticks
                ticks={{maxTicks: 10}}
                lineLength='100%'
                axis='x'
                label={({index}) => xLabels[index]}
                labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge'}}
                labelAttributes={{y: 30}}
              />
              <Transform method='stack'>
                <Bars combined={true} innerPadding='20%' />
              </Transform>
            </Layer>
          </Chart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Stack;
