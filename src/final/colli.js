import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';

const getData = function () {
  console.time('Data done');
  const data = Array.from(new Array(10000), () => ({
    sales: chance.integer({ min: 0, max: 25000 }),
    pi: chance.integer({ min: 0, max: 110 }),
    name: chance.word()
  }));
  console.timeEnd('Data done');

  return data;
};

const CustomDot = (props) => {
  return (<Dot r={6} cx={props.x} cy={props.y} style={{ pointerEvents: 'none', fill: 'none', stroke: '#394256', strokeDasharray: '1,1,1,1' }} />);
}

const Colli = () => (<section className="f-colli chart-wrapper">
  <ResponsiveContainer width="100%" height={500}>
    <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <XAxis dataKey="sales" name="Sales" type="number" />
      <YAxis dataKey="pi" name="PI" type="number" />
      <CartesianGrid />
      <Scatter
        name='Colli'
        data={getData()}
        fill="#33ADFF"
        shape={<Dot
          r={2}
          onMouseEnter={({ target }) => target.setAttribute('r', 4)}
          onMouseLeave={({ currentTarget }) => currentTarget.setAttribute('r', 2)}
        />}
      />
      <Tooltip cursor={<CustomDot />} />
    </ScatterChart>
  </ResponsiveContainer>
</section>);

export default Colli;
