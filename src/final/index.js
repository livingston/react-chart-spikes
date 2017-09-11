import React, { Component } from 'react';
import { addDays, differenceInDays, format } from 'date-fns';
require('chance');

import PriceDistributionChart from './priceDistributionChart';
import PITrendChart from './piTrendChart';

const minRange = 80;
const maxRange = 120;
const variation = 0.03;

const getNextValue = (ref) => chance.integer({ min: Math.max(minRange, ref * (1-variation)), max: Math.min(maxRange, ref * (1+variation)) });

const startDate = new Date('01/01/2017');
let currentDate = startDate;

const topCompetitorsTrend = [];
const competitorTrend = [];

class Competitor {
  constructor(start, includePost = false) {
    this.includePost = includePost;
    this.current = {
      pre: start,
      post: start
    }
  }

  next() {
    const { pre, post } = this.current;

    const nextPre = getNextValue(pre);
    const nextPost = this.includePost ? getNextValue(post) : null;

    this.current = {
      pre: nextPre,
      post: nextPost
    }

    return ({
      pre: nextPre,
      post: nextPost,
    });
  }
}

const vc1 = new Competitor(100);
const topCompetitor1 = new Competitor(90);
const topCompetitor2 = new Competitor(80);
const topCompetitor3 = new Competitor(90);
const topCompetitor4 = new Competitor(80);

const vc2 = new Competitor(100, true);
const competitor5 = new Competitor(80, true);

let surveyDate;

do {
  surveyDate = format(currentDate, 'MM/DD/YYYY');

  topCompetitorsTrend.push({
    surveyDate,
    data: [
      vc1.next(),
      topCompetitor1.next(),
      topCompetitor2.next(),
      topCompetitor3.next(),
      topCompetitor4.next(),
    ]
  });

  competitorTrend.push({
    surveyDate,
    data: [
      vc2.next(),
      competitor5.next()
    ]
  });

  currentDate = addDays(currentDate, 7);
} while(differenceInDays(currentDate, startDate) < 365)

const comparisonData = {
  competitors: ["Virtual Comp.", "Competitor 1"],
  trendData: competitorTrend
};

const piTrendData = {
  competitors: ["Virtual Comp.", "Competitor 1", "Competitor 2", "Competitor 3", "Competitor 4"],
  trendData: topCompetitorsTrend
};

class Final extends Component {
  state = {
    filterData: false,

    trendData: comparisonData
  }

  onFilter = () => {
    const { filterData } = this.state;
    const data = !filterData ? piTrendData : comparisonData;

    this.setState(({ filterData: !filterData, trendData: data }));
  }

  render() {
    return (<section className="f page">
      <PITrendChart data={this.state.trendData} onFilter={this.onFilter} />
      <PriceDistributionChart />
    </section>);
  }
}

export default Final;
