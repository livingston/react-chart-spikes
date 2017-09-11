import React, { Component } from 'react';
import { addDays, differenceInDays, format } from 'date-fns';
require('chance');

import PriceDistributionChart from './priceDistributionChart';
import PITrendChart from './piTrendChart';

const getCompetitorData = () => ([
  { pre: chance.integer({min: 100, max: 105}) },
  { pre: chance.integer({min: 80, max: 85}) },
  { pre: chance.integer({min: 60, max: 65}) },
  { pre: chance.integer({min: 75, max: 80}) },
  { pre: chance.integer({min: 55, max: 60}) },
]);

const startDate = new Date('01/01/2017');
let currentDate = startDate;

const data = [];

do {
  data.push({
    surveyDate: format(currentDate, 'MM/DD/YYYY'),
    data: getCompetitorData()
  });
  currentDate = addDays(currentDate, 1);
} while(differenceInDays(currentDate, startDate) < 365)

const comparisonData = {
  competitors: ["Virtual Comp.", "Competitor 1"],
  trendData: [
    { surveyDate: '09/01/2017', data: [{ pre: 100, post: 90 }, { pre: 60, post: 60 }] },
    { surveyDate: '09/02/2017', data: [{ pre: 100, post: 90 }, { pre: 60, post: 63 }] },
    { surveyDate: '09/03/2017', data: [{ pre: 101, post: 91 }, { pre: 51, post: 45 }] },
    { surveyDate: '09/04/2017', data: [{ pre: 103, post: 93 }, { pre: 53, post: 43 }] },
    { surveyDate: '09/05/2017', data: [{ pre: 104, post: 94 }, { pre: 64, post: 44 }] },
    { surveyDate: '09/06/2017', data: [{ pre: 107, post: 97 }, { pre: 37, post: 43 }] },
    { surveyDate: '09/07/2017', data: [{ pre: 105, post: 95 }, { pre: 55, post: 41 }] },
    { surveyDate: '09/08/2017', data: [{ pre: 108, post: 98 }, { pre: 58, post: 48 }] },
    { surveyDate: '09/09/2017', data: [{ pre: 111, post: 111 }, { pre: 51, post: 41 }] },
    { surveyDate: '09/10/2017', data: [{ pre: 108, post: 98 }, { pre: 58, post: 48 }] },
    { surveyDate: '09/11/2017', data: [{ pre: 109, post: 99 }, { pre: 59, post: 59 }] },
    { surveyDate: '09/12/2017', data: [{ pre: 106, post: null }, { pre: 56, post: 46 }] },
    { surveyDate: '09/13/2017', data: [{ pre: 106, post: 96 }, { pre: 56, post: 56 }] },
    { surveyDate: '09/14/2017', data: [{ pre: 105, post: 95 }, { pre: 55, post: 55 }] },
    { surveyDate: '09/15/2017', data: [{ pre: 104, post: 94 }, { pre: 54, post: 44 }] },
    { surveyDate: '09/16/2017', data: [{ pre: 105, post: 95 }, { pre: 55, post: 45 }] },
    { surveyDate: '09/17/2017', data: [{ pre: 104, post: 94 }, { pre: 54, post: 44 }] },
    { surveyDate: '09/18/2017', data: [{ pre: 107, post: 97 }, { pre: 57, post: 57 }] },
    { surveyDate: '09/19/2017', data: [{ pre: 106, post: 96 }, { pre: 56, post: 56 }] },
    { surveyDate: '09/20/2017', data: [{ pre: 109, post: 99 }, { pre: 59, post: 39 }] },
    { surveyDate: '09/21/2017', data: [{ pre: 107, post: 97 }, { pre: 47, post: 37 }] },
    { surveyDate: '09/22/2017', data: [{ pre: 106, post: 96 }, { pre: 56, post: 46 }] },
    { surveyDate: '09/23/2017', data: [{ pre: 104, post: null }, { pre: 54, post: 44 }] },
    { surveyDate: '09/24/2017', data: [{ pre: 103, post: null }, { pre: 53, post: 43 }] },
    { surveyDate: '09/25/2017', data: [{ pre: 100, post: null }, { pre: 60, post: 50 }] },
    { surveyDate: '09/26/2017', data: [{ pre: 98, post: null  }, { pre: 68, post: 50 }] },
    { surveyDate: '09/27/2017', data: [{ pre: 96, post: null  }, { pre: 56, post: 46 }] },
    { surveyDate: '09/28/2017', data: [{ pre: 96, post: null  }, { pre: 46, post: 46 }] },
    { surveyDate: '09/29/2017', data: [{ pre: 95, post: null  }, { pre: 55, post: 45 }] },
    { surveyDate: '09/30/2017', data: [{ pre: 94, post: null  }, { pre: 59, post: 44 }] }
  ]
};

const piTrendData = {
  competitors: ["Virtual Comp.", "Competitor 1", "Competitor 2", "Competitor 3", "Competitor 4"],
  trendData: data
};

const Final = () => (<section className="f page">
  <PITrendChart data={comparisonData} />
  <PriceDistributionChart />
  <PITrendChart data={piTrendData} />
</section>);

export default Final;
