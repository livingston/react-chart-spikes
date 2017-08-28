import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import FlexibleWrapper from '../ui/flexibleWrapper.js';

// Test data
require('chance');

const data = [{
  label: 'Virtual Competitor',
  cheap: chance.integer({min: 0, max: 1000}),
  higher: chance.integer({min: 0, max: 1000}),
  same: chance.integer({min: 0, max: 1000}),
  nomatch: chance.integer({min: 0, max: 1000}),
  promo: chance.integer({min: 0, max: 1000})
},{
  label: 'Competitor 1',
  cheap: chance.integer({min: 0, max: 1000}),
  higher: chance.integer({min: 0, max: 1000}),
  same: chance.integer({min: 0, max: 1000}),
  nomatch: chance.integer({min: 0, max: 1000}),
  promo: chance.integer({min: 0, max: 1000})
}, {
  label: 'Competitor 2',
  cheap: chance.integer({min: 0, max: 1000}),
  higher: chance.integer({min: 0, max: 1000}),
  same: chance.integer({min: 0, max: 1000}),
  nomatch: chance.integer({min: 0, max: 1000}),
  promo: chance.integer({min: 0, max: 1000})
}, {
  label: 'Competitor 3',
  cheap: chance.integer({min: 0, max: 1000}),
  higher: chance.integer({min: 0, max: 1000}),
  same: chance.integer({min: 0, max: 1000}),
  nomatch: chance.integer({min: 0, max: 1000}),
  promo: chance.integer({min: 0, max: 1000})
}, {
  label: 'Competitor 4',
  cheap: chance.integer({min: 0, max: 1000}),
  higher: chance.integer({min: 0, max: 1000}),
  same: chance.integer({min: 0, max: 1000}),
  nomatch: chance.integer({min: 0, max: 1000}),
  promo: chance.integer({min: 0, max: 1000})
}];


const RTip = ({ payload }) => {
  if (payload.length) {
    return (<div className="custom-tooltip">
      <ul>
        {payload.map(item => (<li key={item.name}>
          <span className="key" style={{ color: item.color }}>{item.name}</span>
          <span className="value">{item.value.toFixed(2)}%</span>
          </li>))}
      </ul>
    </div>);
  }

  return null;
};


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

    const articles = Object.keys(data[0]).map(article => ({ label: article, key: article, color: chance.color({format: 'hex'}) }));
    articles.shift();

    const finalData = data.map((d) => {
      const values = Object.values(d);
      values.shift();
      const total = values.reduce((sum, v) => (sum + v), 0);

      const o = {
        label: d.label,
        original: d
      };

      values.forEach((v, i) => {
        return  o[articles[i].key] = (v / total) * 100;
      });

      return o;
    });

    return (<section className="chart-wrapper">
      <section className="chart-legend">
        <h3>Stacked Bar Chart</h3>
      </section>
      <section className="chart" ref={n => (this.node = n)}>
        <FlexibleWrapper onResize={this.updateDimensions}>
          <BarChart width={width} height={height} data={finalData} labelKey="label" margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip content={<RTip />}/>
            <Legend />

            {articles.map((article, i) => (
              <Bar dataKey={article.key} name={article.label} stackId="a" key={i} fill={article.color} />
            ))}
          </BarChart>
        </FlexibleWrapper>
      </section>
    </section>);
  }
}

export default RStack;
