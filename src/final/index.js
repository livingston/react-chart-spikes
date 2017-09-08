import React, { Component } from 'react';
import PriceDistributionChart from './priceDistributionChart';
import PITrendChart from './piTrendChart';

const Final = () => (<section className="f page">
  <PITrendChart />
  <PriceDistributionChart />
</section>);

export default Final;
