import React, { Component } from 'react';
import { maxBy, minBy } from 'lodash';

import { scaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import { select, event as d3Event } from 'd3-selection';

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
  {scale.ticks().map(tick => (<g transform={`translate(${scale(tick)}, 0)`} key={tick}>
    <line x1={0} x2={0} y1={0} y2={5} />
    <text x={0} y={20} dy=".3em" key={tick}>{tick}</text>
  </g>))}
</g>)

const YAxis = ({ scale, padding, height, left }) => (<g className="axis y-axis" transform={`translate(0, ${padding})`}>
  <line x1={left} x2={left} y1={padding} y2={height} />
  {scale.ticks().map(tick => (<g transform={`translate(0, ${scale(tick)})`} key={tick}>
    <line x1={left - 5} x2={left} y1={0} y2={0} />
    <text x={left - 10} y={0} dy=".3em" key={tick}>{tick}</text>
  </g>))}
</g>)

const axisHeight = 50;
const axisWidth = 50;
const padding = 50;
const yPadding = padding + axisHeight;

class Scatter extends Component {
  constructor(props) {
    super(props);

    const minX = minBy(data, (d) => d.x).x;
    const maxX = maxBy(data, (d) => d.x).x;
    const minY = minBy(data, (d) => d.y).y;
    const maxY = maxBy(data, (d) => d.y).y;

    this.xScale = scaleLinear().domain([minX, maxX]);
    this.yScale = scaleLinear().domain([minY, maxY]);

    this.state = {
      width: 100,
      height: 100,
      currentPoint: null,
      xScale: this.xScale,
      yScale: this.yScale,
      zoomLevel: 1,
      maxZoomLevel: 4,
      minZoomLevel: 1
    };
  }

  componentDidMount() {
    this.updateDimensions();

    this.zoom = zoom()
      .scaleExtent([this.state.minZoomLevel, this.state.maxZoomLevel])
      .on("zoom", this.onZoom);

    select(this.chart)
      .call(this.zoom)
      .on("dblclick.zoom", null);
  }

  updateDimensions = () => {
    const { clientWidth: width, clientHeight: height } = this.node;
    this.setState({
      width,
      height
    }, () => {
        this.zoom.translateExtent([[0, 0], [width, height]]);

      // setTimeout(() => {
      //   console.log('zooming');
      //   this.zoom.scaleBy(select(this.chart), 3);
      // }, 3000);
    });
  }

  showPoint = (currentPoint) => {
    this.setState({ currentPoint });
  }

  clearPoint = () => (this.setState({ currentPoint: null }))

  onZoom = () => {
    const { xScale, yScale } = this;

    const updatedXScale = d3Event.transform.rescaleX(xScale);
    const updatedYScale = d3Event.transform.rescaleY(yScale);

    this.setState({
      xScale: updatedXScale,
      yScale: updatedYScale
    });
    // select(this.chart).select('.dots').attr('transform', d3Event.transform);
  }

  zoomIn = () => {
    this.setState(state => {
      const { zoomLevel, maxZoomLevel } = state;

      if (zoomLevel < maxZoomLevel) {
        this.zoom.scaleBy(select(this.chart), zoomLevel + 1);
        return { zoomLevel: zoomLevel + 1 };
      }

      return { zoomLevel: maxZoomLevel };
    });
  }

  zoomOut = () => {
    this.setState(state => {
      const { zoomLevel, minZoomLevel } = state;

      if (zoomLevel > minZoomLevel) {
        this.zoom.scaleBy(select(this.chart), 1 - Math.abs(zoomLevel));
        return { zoomLevel: 1 - Math.abs(zoomLevel) };
      }

      return { zoomLevel: minZoomLevel };
    });
  }

  render() {
    const { width, height, currentPoint, xScale, yScale, zoomLevel, maxZoomLevel, minZoomLevel } = this.state;

    xScale.range([padding, width - padding]);
    yScale.range([height - yPadding, yPadding]);

    return (<section className="chart-wrapper d3">
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
        <div className="d3-controls">
          <button className="d3-zoom-in" onClick={this.zoomIn} disabled={zoomLevel === maxZoomLevel}>+</button>
          <button className="d3-zoom-out" onClick={this.zoomOut} disabled={zoomLevel === minZoomLevel}>-</button>
        </div>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <svg width={width} height={height} ref={node => (this.chart = node)}>
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
