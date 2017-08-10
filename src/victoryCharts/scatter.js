import React, { Component } from 'react';
import { VictoryScatter, VictoryChart, VictoryAxis, VictoryTheme,
  VictoryVoronoiContainer, VictoryContainer, VictoryClipContainer,
  VictoryTooltip, VictoryLegend } from 'victory';
import { maxBy, minBy } from 'lodash';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const scatterDatum = () => ({
  x: chance.integer({min: 0, max: 1000}),
  y: chance.integer({min: 0, max: 1000}),
  competitor: chance.pickone(['c1', 'c2'])
});
const data = Array.apply(null, Array(100)).map(scatterDatum);

const CustomPoint = ({ x, y, datum }) => (<circle fill={(datum.competitor === 'c1' ? '#f00' : '#00f')} r={5} cx={x} cy={y} />);

class Scatter extends Component {
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
    const minX = minBy(data, (d) => d.x).x;
    const maxX = maxBy(data, (d) => d.x).x;
    const minY = minBy(data, (d) => d.y).y;
    const maxY = maxBy(data, (d) => d.y).y;

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Scatter Plot</h3>
        <VictoryLegend
          width={width}
          theme={VictoryTheme.material}
          padding={{ top: 50, left: 50 }}
          data={[
            {name: 'Competitor 1', symbol: { type: 'circle', fill: '#f00'} },
            {name: 'Competitor 2', symbol: { type: 'circle', fill: '#00f'} }
            ]}
          orientation="horizontal"
          containerComponent={<VictoryContainer responsive={false} />}
        />
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <VictoryChart
            width={width} height={height}
            domain={{ x: [minX, maxX], y: [minY, maxY] }}
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer responsive={false}/>}
            padding={60}
          >
            <VictoryScatter
              size={7}
              data={data}
              dataComponent={<CustomPoint />}
              labelComponent={<VictoryTooltip />}
              groupComponent={<VictoryClipContainer />}
              labels={(d) => `${d.x}, ${d.y}`}
            />

            <VictoryAxis domain={[minX, maxX]} tickCount={10} label="Colli"
              style={{
                axisLabel: {fontSize: 16, padding: 40}
              }}
            />
            <VictoryAxis dependentAxis domain={[minY, maxY]} tickCount={10} label="Price Index"
              style={{
                axisLabel: {fontSize: 16, padding: 40}
              }}
            />
          </VictoryChart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Scatter;
