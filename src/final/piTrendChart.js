import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot, ResponsiveContainer } from 'recharts';
import { get, set, filter } from 'lodash';
import { format } from 'date-fns';

const competitors = ["Virtual Comp.", "Competitor 1", "Competitor 2", "Competitor 3"];

const data = [
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
];

const colors = ["#0094fc", "#c94908", "#62993f", "#0067a8", "#1d2f57"];

const competitorPreMap = competitors.map((c, i) => ({
  label: c,
  color: colors[i],
  key: `data[${i}].pre`
}));

const competitorPostMap = competitors.map((c, i) => ({
  label: c,
  key: `data[${i}].post`,
  color: colors[i],
  strokeStyle: "3 4 5 2"
}));

const CustomTooltip = ({ data: surveyData }) => (<div className="f-trend-tooltip">
  <h4>Survey Week – {surveyData.surveyDate}</h4>
  <ul>
    <li><span /><span>Pre</span><span>Post</span></li>
    {surveyData.data.map((competitor, index) => (<li key={index} style={{ color: colors[index] }}>
      <span>{competitors[index]}</span>
      <span>{competitor.pre}</span>
      <span>{competitor.post}</span>
    </li>))}
  </ul>
</div>);

class PITrendChart extends Component {
  state = {
    width: 500,
    height: 400,
    formattedData: [],

    currentLine: null,
    currentSurveyDate: null
  }

  componentDidMount() {
    this.setState({
      formattedData: data
    });
  }

  clearState = () => this.setState({ currentLine: null, currentSurveyDate: null })

  setCurrentState = (currentLine, currentWeek) => {
    this.setState({ currentLine, currentWeek });
  }

  renderTooltip = ({ label }) => {
    const currentWeek = filter(this.state.formattedData, ["surveyDate", label])[0];

    if (!currentWeek) return;

    return (<CustomTooltip data={currentWeek} />);
  }

  render() {
    const { width, height, formattedData } = this.state;

    return (<section className="f-trend chart-wrapper">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={formattedData}
          margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
          onMouseMove={({ activeLabel, activeTooltipIndex, activePayload }) => {
            {/* console.log(activeLabel, activeTooltipIndex, activePayload); */}
          }}
        >
          <XAxis dataKey="surveyDate" ticks={['09/01/2017', '10/01/2017']} tickFormatter={t => format(t, 'MMM')} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip content={this.renderTooltip} cursor={false} />

          {competitorPreMap.map(competitor => (<Line
            key={competitor.key}
            type="monotone"
            dataKey={competitor.key}
            stroke={competitor.color}
            dot={{ r: 1 }}
            activeDot={{ r: 3 }}
          />))}
          {competitorPostMap.map(competitor => (<Line
            key={competitor.key}
            type="monotone"
            dataKey={competitor.key}
            stroke={competitor.color}
            strokeDasharray={competitor.strokeStyle}
            dot={{ r: 1 }}
            activeDot={{ r: 3 }}
          />))}
        </LineChart>
      </ResponsiveContainer>
    </section>);
  }
}

export default PITrendChart;
