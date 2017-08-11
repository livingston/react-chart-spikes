import React, { Component } from 'react';
import { maxBy, minBy } from 'lodash';

import { scaleLinear } from 'd3-scale';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const competitors = { c1: "Competitor 1", c2: "Competitor 2" };

const scatterDatum = () => ({
  x: chance.integer({min: 0, max: 1000}),
  y: chance.integer({min: 0, max: 1000}),
  competitor: chance.pickone(['c1', 'c2'])
});
const data = Array.apply(null, Array(100)).map(scatterDatum);

const Dot = ({ point, xScale, yScale, onMouseOver, onMouseOut }) => (<circle onMouseOver={onMouseOver} onMouseOut={onMouseOut}
  cx={xScale(point.x)} cy={yScale(point.y)} r={5}
  fill={(point.competitor === 'c1' ? '#f00' : '#00f')}
/>);

const XAxis = ({ scale, top, width, left }) => (<g className="axis x-axis" transform={`translate(0, ${top})`}>
  <line x1={left} x2={width} y1={0} y2={0} />
  {scale.ticks().map(tick => (<g transform={`translate(${scale(tick)}, 0)`}>
    <line x1={0} x2={0} y1={0} y2={5} />
    <text x={0} y={20} dy=".3em" key={tick}>{tick}</text>
  </g>))}
</g>)

const YAxis = ({ scale, padding, height, left }) => (<g className="axis y-axis" transform={`translate(0, ${padding})`}>
  <line x1={left} x2={left} y1={padding} y2={height} />
  {scale.ticks().map(tick => (<g transform={`translate(0, ${scale(tick)})`}>
    <line x1={left - 5} x2={left} y1={0} y2={0} />
    <text x={left - 10} y={0} dy=".3em" key={tick}>{tick}</text>
  </g>))}
</g>)

class Scatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      currentPoint: null
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

  showPoint = (currentPoint) => {
    this.setState({ currentPoint });
  }

  clearPoint = () => (this.setState({ currentPoint: null }))

  render() {
    const { width, height, currentPoint } = this.state;

    const minX = minBy(data, (d) => d.x).x;
    const maxX = maxBy(data, (d) => d.x).x;
    const minY = minBy(data, (d) => d.y).y;
    const maxY = maxBy(data, (d) => d.y).y;

    const axisHeight = 50;
    const axisWidth = 50;
    const padding = 50;
    const yPadding = padding + axisHeight;

    const xScale = scaleLinear().domain([minX, maxX]).range([padding, width - padding]);
    const yScale = scaleLinear().domain([minY, maxY]).range([height - yPadding, yPadding]);

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Scatter Plot</h3>
        {currentPoint ?
          <div className="currentPoint" style={{ backgroundColor: (currentPoint.competitor === 'c1' ? '#f00' : '#00f') }}>
            <div>{competitors[currentPoint.competitor]}</div>
            <div>x: {currentPoint.x}</div>
            <div>y: {currentPoint.y}</div>
          </div>
        : null }
        <ul className="d3-legend">
          <li><span style={{ backgroundColor: "#f00" }} />Competitor 1</li>
          <li><span style={{ backgroundColor: "#00f" }} />Competitor 2</li>
        </ul>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <svg width={width} height={height}>
            <g className="dots">
              {data.map((datum, i) => <Dot
                point={datum} xScale={xScale} yScale={yScale} key={i}
                onMouseOver={() => (this.showPoint(datum))}
                onMouseOut={this.clearPoint}
              />)}
            </g>
            <XAxis scale={xScale} top={height - axisHeight} left={padding} width={width - padding} />
            <YAxis scale={yScale} left={axisWidth} padding={padding} height={height - axisHeight - padding} />
          </svg>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Scatter;
