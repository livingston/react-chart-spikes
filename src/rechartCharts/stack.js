import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const getPrePostData = () =>({pre: {
  cheap: chance.integer({min: 0, max: 1000}),
  higher: chance.integer({min: 0, max: 1000}),
  same: chance.integer({min: 0, max: 1000}),
  nomatch: chance.integer({min: 0, max: 1000}),
  promo: chance.integer({min: 0, max: 1000})
},
post: {
  cheap: chance.integer({min: 0, max: 1000}),
  higher: chance.integer({min: 0, max: 1000}),
  same: chance.integer({min: 0, max: 1000}),
  nomatch: chance.integer({min: 0, max: 1000}),
  promo: chance.integer({min: 0, max: 1000})
}})

const getData = () => ([{
  label: 'Virtual Competitor',
  ...getPrePostData()
},{
  label: 'Competitor 1',
  ...getPrePostData()
}, {
  label: 'Competitor 2',
  ...getPrePostData()
}, {
  label: 'Competitor 3',
  ...getPrePostData()
}, {
  label: 'Competitor 4',
  ...getPrePostData()
}]);


const preColors = ['#cfeba0', '#ff8656', '#a5dafd', '#a4bbea', '#e3d29b'];
const postColors = ['#acd666', '#ff5916', '#66c2ff', '#7d92bc', '#bcad7d'];

const data = getData();

const preGroups = Object.keys(data[0].pre).map((group, i) => ({ label: group, key: `pre.${group}`, color: preColors[i] }));
const postGroups = Object.keys(data[0].post).map((group, i) => ({ label: group, key: `post.${group}`, color: postColors[i] }));

const finalData = data.map((d) => {
  const preValues = Object.values(d.pre);
  const preTotal = preValues.reduce((sum, v) => (sum + v), 0);

  const postValues = Object.values(d.post);
  const postTotal = postValues.reduce((sum, v) => (sum + v), 0);

  const o = {
    label: d.label,
    original: d
  };

  preValues.forEach((v, i) => {
    return  o[preGroups[i].key] = (v / preTotal) * 100;
  });

  postValues.forEach((v, i) => {
    return  o[postGroups[i].key] = (v / postTotal) * 100;
  });

  return o;
});

console.log(finalData);

const RTip = ({ payload }) => {
  return (<div className="custom-tooltip">
    <ul>
      {Object.keys(payload).map((item, i) => (
        <li key={`${item}-${i}`}>
          <span className="key" style={{ color: item.color }}>{item}</span>
          <span className="value">{payload[item].toFixed(2)}%</span>
        </li>
      ))}
    </ul>
  </div>);
}

const CustomLegend = () => (<ul className="legend">
  {postGroups.map(item => (<li key={item.label}><span style={{backgroundColor: item.color}} />{item.label}</li>))}
</ul>)


class RStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      currentBar:'pre',
      currentGroup: 'Competitor 1'
    };
  }

  componentDidMount() {
    this.updateDimensions();
  }

  updateDimensions = () => {
    this.setState({
      width: this.node.clientWidth,
      height: 500, // this.node.clientHeight
    });
  }

  setTooltipCallback = (barType) => {
    return (data) => {
      this.setState({
        currentBar: barType,
        currentGroup: data.label
      })
    };
  }

  getCurrentTooltipData = () => {
    const { currentBar, currentGroup } = this.state;

    return data.filter(d => d.label === currentGroup).pop()[currentBar];
  }

  renderTooltip = (...all) => {
    console.log('Render ToolTip');

    const tipData = this.getCurrentTooltipData();

    return (<RTip payload={tipData} />);
  }

  render() {
    const { width, height } = this.state;
    let currentBar = 'pre';
    let currentGroup = '';

    return (<section className="chart-wrapper rechart">
      <section className="chart-legend">
        <h3>Stacked Bar Chart</h3>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <BarChart width={width} height={height} data={finalData} labelKey="label" margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="label"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip content={this.renderTooltip}/>
            <Legend content={CustomLegend} />

            {preGroups.map((article, i) => (
              <Bar dataKey={article.key} name={article.label} stackId="pre" key={i} fill={article.color} onMouseEnter={this.setTooltipCallback('pre')} />
            ))}
            {postGroups.map((article, i) => (
              <Bar dataKey={article.key} name={article.label} stackId="post" key={`post-${i}`} fill={article.color} onMouseEnter={this.setTooltipCallback('post')} />
            ))}
          </BarChart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default RStack;
