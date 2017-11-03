import React, { Component } from 'react';
import { maxBy, minBy } from 'lodash';

import { scaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import { select, event as d3Event } from 'd3-selection';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const scatterDatum = () => ({
  x: chance.integer({min: 0, max: 1000}),
  y: chance.integer({min: 0, max: 1000}),
  name: chance.word()
});
const data = Array.apply(null, Array(1000)).map(scatterDatum);

const Dot = ({ point, xScale, yScale, onMouseOver, onMouseOut }) => (<circle onMouseOver={onMouseOver} onMouseOut={onMouseOut}
  cx={xScale(point.x)} cy={yScale(point.y)} r={5}
  fill="#33adff"
/>);

const XAxis = ({ scale, top, width, left }) => (<g className="axis x-axis" transform={`translate(0, ${top})`}>
  <line x1={left} x2={width} y1={0} y2={0} />
  {scale.ticks().map(tick => (<g transform={`translate(${scale(tick)}, 0)`} key={tick}>
    <line x1={0} x2={0} y1={0} y2={5} />
    <text x={0} y={20} dy=".3em" key={tick}>{tick}</text>
  </g>))}
</g>)

const YAxis = ({ scale, padding, height, left, top }) => (<g className="axis y-axis" transform={`translate(${padding}, ${top})`}>
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
      width: 500,
      height: 500,
      currentPoint: null,
      xScale: this.xScale,
      yScale: this.yScale,
      zoomLevel: 1,
      zoomFactor: 0.2,
      maxZoomLevel: 4,
      minZoomLevel: 1
    };
  }

  get filteredData() {
    const { xScale, yScale } = this.state;
    const [minX, maxX] = xScale.domain();
    const [minY, maxY] = yScale.domain();

    return data.filter(({ x, y }) => (x >= minX && x <= maxX && y >= minY && y <= maxY));
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
      yScale: updatedYScale,
      zoomLevel: d3Event.transform.k
    });
  }

  updateZoomLevel = () => {
    this.zoom.scaleTo(select(this.chart), this.state.zoomLevel);
  }

  zoomIn = () => {
    this.setState(state => {
      const { zoomFactor, zoomLevel, maxZoomLevel } = state;

      if (zoomLevel < maxZoomLevel) {
        const zoomIn = zoomLevel * (1 + zoomFactor);
        return { zoomLevel: zoomIn };
      }

      return { zoomLevel: maxZoomLevel };
    }, this.updateZoomLevel);
  }

  zoomOut = () => {
    this.setState(state => {
      const { zoomFactor, zoomLevel, minZoomLevel } = state;

      if (zoomLevel > minZoomLevel) {
        const zoomOut = zoomLevel * (1 - zoomFactor);
        return { zoomLevel: zoomOut };
      }

      return { zoomLevel: minZoomLevel };
    }, this.updateZoomLevel);
  }

  render() {
    const { width, height, currentPoint, xScale, yScale, zoomLevel, maxZoomLevel, minZoomLevel } = this.state;

    xScale.range([padding, width - padding]);
    yScale.range([height - axisHeight - padding, padding]);

    return (<section className="chart-wrapper d3">
      <section className="chart-legend">
        <h3>Scatter Plot</h3>
        {currentPoint ?
          <div className="currentPoint" style={{ backgroundColor: '#33adff' }}>
            <div>name: {currentPoint.name}</div>
            <div>x: {currentPoint.x}</div>
            <div>y: {currentPoint.y}</div>
          </div>
        : null }
        <div className="d3-controls">
          <button className="d3-zoom-in" onClick={this.zoomIn} disabled={zoomLevel === maxZoomLevel}>+</button>
          <button className="d3-zoom-out" onClick={this.zoomOut} disabled={zoomLevel === minZoomLevel}>-</button>
        </div>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <svg width={width} height={height} ref={node => (this.chart = node)}>
            <defs>
              <clipPath id="scatter-clip"><rect x={padding} y={0} width={width - (padding * 2)} height={height} /></clipPath>
            </defs>
            <g className="dots" clipPath="url(#scatter-clip)">
              {this.filteredData.map((datum, i) => <Dot
                point={datum} xScale={xScale} yScale={yScale} key={i}
                onMouseOver={() => (this.showPoint(datum))}
                onMouseOut={this.clearPoint}
              />)}
            </g>
            <XAxis scale={xScale} top={height - axisHeight} left={padding} width={width - padding} />
            <YAxis scale={yScale} top={padding} left={axisWidth} padding={0} height={height - axisHeight - padding} />
          </svg>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default Scatter;
