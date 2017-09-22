import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot, ResponsiveContainer } from 'recharts';
import { format, parse } from 'date-fns';

const colors = ["#0094fc", "#c94908", "#62993f", "#0067a8", "#1d2f57"];

const getMonthTicks = (data) => {
  const ticks = [];
  let currentMonth;
  let currentDate;

  data.trendData && data.trendData.forEach(({ pricingWeekStart }) => {
    currentDate = parse(pricingWeekStart);

    if (currentDate.getMonth() !== currentMonth) {
      currentMonth = currentDate.getMonth();
      ticks.push(format(currentDate, 'MM/DD/YYYY'));
    }
  });

  return ticks;
};

const CustomTooltip = ({ data: surveyData, competitors }) => {
  const pricingWeekData = surveyData.data;
  return (<div className="f-trend-tooltip">
    <h4>Survey Week – {surveyData.pricingWeekStart}</h4>
    <ul>
      <li><span /><span>Pre</span><span>Post</span></li>
      {Object.keys(pricingWeekData).map((competitor, index) => (<li key={competitor} style={{ color: colors[index] }}>
        <span>{competitor}</span>
        <span>{pricingWeekData[competitor].pre}</span>
        <span>{pricingWeekData[competitor].post}</span>
      </li>))}
    </ul>
  </div>);
};

class PITrendChart extends Component {
  state = {
    width: 500,
    height: 250,
    data: {},

    competitorPreMap: [],
    competitorPostMap: [],

    currentLine: null,
    currentpricingWeekStart: null
  }

  populateData(props) {
    const { data } = props;

    const competitorPreMap = data.competitors.map((c, i) => ({
      label: c,
      color: colors[i],
      key: `data["${c}"].pre`
    }));

    const competitorPostMap = data.competitors.map((c, i) => ({
      label: c,
      color: colors[i],
      key: `data["${c}"].post`,
      strokeStyle: "3 4 5 2"
    }));

    console.log(competitorPostMap);

    this.setState({
      competitorPreMap,
      competitorPostMap,
      data
    })
  }

  componentDidMount() {
    this.populateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.populateData(nextProps);
  }

  clearState = () => this.setState({ currentLine: null, currentpricingWeekStart: null })

  setCurrentState = (currentLine, currentWeek) => {
    this.setState({ currentLine, currentWeek });
  }

  get isCompare() {
    return (this.props.data.competitors.length === 2);
  }

  renderTooltip = ({ label }) => {
    const { data } = this.state;
    const currentWeek = data.trendData.filter(d => d.pricingWeekStart === label)[0];

    if (!currentWeek) return;

    return (<CustomTooltip data={currentWeek} competitors={data.competitors} />);
  }

  render() {
    const { width, height, data, competitorPreMap, competitorPostMap } = this.state;
    console.log('isCompare', this.isCompare);
    return (<section className="f-trend chart-wrapper">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data.trendData}
          margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
          onMouseMove={({ activeLabel, activeTooltipIndex, activePayload }) => {
            {/* console.log(activeLabel, activeTooltipIndex, activePayload); */ }
          }}
        >
          <XAxis dataKey="pricingWeekStart" ticks={getMonthTicks(data)} tickFormatter={t => (parse(t).getMonth() === 0 ? format(t, 'MMM ‘YY') : format(t, 'MMM'))} />
          <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={this.renderTooltip} />

          {!this.props.showPost && competitorPreMap.map(competitor => (<Line
            key={competitor.key}
            type="monotone"
            dataKey={competitor.key}
            stroke={competitor.color}
            dot={{ r: 0 }}
            activeDot={{ r: 5 }}
          />))}

          {this.props.showPost && competitorPostMap.map(competitor => (<Line
            key={competitor.key}
            type="monotone"
            dataKey={competitor.key}
            stroke={competitor.color}
            strokeDasharray={this.isCompare ? '' : competitor.strokeStyle}
            dot={{ r: 0 }}
            activeDot={{ r: 5 }}
          />))}
        </LineChart>
      </ResponsiveContainer>
      <label className="filter-trend"><input type="checkbox" checked={this.props.compare} onChange={this.props.onFilter} value="compare" />Compare</label>
      <label className="filter-trend"><input type="checkbox" checked={this.props.showPost} onChange={this.props.togglePrePost} value="post" />Post</label>
    </section>);
  }
}

export default PITrendChart;
