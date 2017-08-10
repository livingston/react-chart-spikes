import React, { Component } from 'react';
import { Chart, Layer, Dots, Ticks } from 'rumble-charts';
import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const scatterDatum = () => ({
  x: chance.integer({min: 0, max: 1000}),
  y: chance.integer({min: 0, max: 1000}),
  competitor: chance.pickone(['c1', 'c2'])
});
const data = Array.apply(null, Array(100)).map(scatterDatum);

const series = [{
    data: [{x: 10, y: 1, weight: 2}, {y: 2, weight: 3}, {y: 3, weight: 2}]
}];

class Scatter extends Component {
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
    console.log(this.state);
    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Scatter Plot</h3>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <Chart width={width} height={height} series={[{ data }]} minY={0}>
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
                labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge'}}
                labelAttributes={{y: 30}}
              />
              <Dots circleRadius={5} dotStyle={({ point }) => ({ fill: (point.competitor === 'c1' ? '#f00' : '#00f') })} />
            </Layer>
          </Chart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Scatter;
