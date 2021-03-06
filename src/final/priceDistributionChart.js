import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Rectangle, ResponsiveContainer } from 'recharts';
import { cloneDeep } from 'lodash';

const apiData =[{
  "name": "Virtual Comp.",
  "pi": 0,
  "price_distribution": {
    "pre": {
      "metro_is_lower": {
        "number_of_articles": 20000,
        "percentage": 20
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 35
      },
      "metro_is_higher": {
        "number_of_articles": 10000,
        "percentage": 10
      },
      "nomatch": {
        "number_of_articles": 20000,
        "percentage": 20
      },
      "promo": {
        "number_of_articles": 25000,
        "percentage": 15
      }
    },
    "post": {}
  }
}, {
  "name": "Competitor 1",
  "pi": 0,
  "price_distribution": {
    "pre": {
      "metro_is_lower": {
        "number_of_articles": 30000,
        "percentage": 30
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 25
      },
      "metro_is_higher": {
        "number_of_articles": 20000,
        "percentage": 20
      },
      "nomatch": {
        "number_of_articles": 10000,
        "percentage": 10
      },
      "promo": {
        "number_of_articles": 15000,
        "percentage": 15
      }
    },
    "post": {}
  }
},{
  "name": "Competitor 2",
  "pi": 0,
  "price_distribution": {
    "pre": {
      "metro_is_lower": {
        "number_of_articles": 30000,
        "percentage": 30
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 15
      },
      "metro_is_higher": {
        "number_of_articles": 20000,
        "percentage": 10
      },
      "nomatch": {
        "number_of_articles": 10000,
        "percentage": 5
      },
      "promo": {
        "number_of_articles": 15000,
        "percentage": 40
      }
    },
    "post": {
      "metro_is_lower": {
        "number_of_articles": 30000,
        "percentage": 20
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 20
      },
      "metro_is_higher": {
        "number_of_articles": 20000,
        "percentage": 20
      },
      "nomatch": {
        "number_of_articles": 10000,
        "percentage": 20
      },
      "promo": {
        "number_of_articles": 15000,
        "percentage": 20
      }
    }
  }
}, {
  "name": "Competitor 3",
  "pi": 0,
  "price_distribution": {
    "pre": {
      "metro_is_lower": {
        "number_of_articles": 30000,
        "percentage": 30
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 15
      },
      "metro_is_higher": {
        "number_of_articles": 20000,
        "percentage": 10
      },
      "nomatch": {
        "number_of_articles": 10000,
        "percentage": 5
      },
      "promo": {
        "number_of_articles": 15000,
        "percentage": 40
      }
    },
    "post": {
      "metro_is_lower": {
        "number_of_articles": 30000,
        "percentage": 20
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 20
      },
      "metro_is_higher": {
        "number_of_articles": 20000,
        "percentage": 20
      },
      "nomatch": {
        "number_of_articles": 10000,
        "percentage": 20
      },
      "promo": {
        "number_of_articles": 15000,
        "percentage": 20
      }
    }
  }
}, {
  "name": "Competitor 4",
  "pi": 0,
  "price_distribution": {
    "pre": {
      "metro_is_lower": {
        "number_of_articles": 30000,
        "percentage": 30
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 15
      },
      "metro_is_higher": {
        "number_of_articles": 20000,
        "percentage": 10
      },
      "nomatch": {
        "number_of_articles": 10000,
        "percentage": 5
      },
      "promo": {
        "number_of_articles": 15000,
        "percentage": 40
      }
    },
    "post": {
      "metro_is_lower": {
        "number_of_articles": 30000,
        "percentage": 20
      },
      "metro_is_same": {
        "number_of_articles": 35000,
        "percentage": 20
      },
      "metro_is_higher": {
        "number_of_articles": 20000,
        "percentage": 20
      },
      "nomatch": {
        "number_of_articles": 10000,
        "percentage": 20
      },
      "promo": {
        "number_of_articles": 15000,
        "percentage": 20
      }
    }
  }
}];

const DISTRIBUTION_GROUPS = {
  "metro_is_lower": {
    label: "Cheaper",
    color: {
      pre: "#cfeba0",
      post: "#acd666"
    }
  },
  "metro_is_same": {
    label: "Same",
    color: {
      pre: "#a5dafd",
      post: "#66c2ff"
    }
  },
  "metro_is_higher": {
    label: "Higher",
    color: {
      pre: "#ff8656",
      post: "#ff5916"
    }
  },
  "nomatch": {
    label: "Not Matched",
    color: {
      pre: "#a4bbea",
      post: "#7d92bc"
    }
  },
  "promo": {
    label: "Comp. Promo",
    color: {
      pre: "#ece1bf",
      post: "#bcad7d"
    }
  },
  "nodata": {
    label: "NO DATA",
    color: {
      pre: "#f2f2f2",
      post: "#f2f2f2"
    }
  }
};

const GROUPINGS_PRE = Object.keys(DISTRIBUTION_GROUPS).map((group, i) => ({ label: group, key: `price_distribution.pre.${group}.percentage`, color: DISTRIBUTION_GROUPS[group].color.pre }));
const GROUPINGS_POST = Object.keys(DISTRIBUTION_GROUPS).map((group, i) => ({ label: group, key: `price_distribution.post.${group}.percentage`, color: DISTRIBUTION_GROUPS[group].color.post }));

const TooltipContent = ({ data, activeType, activeSegment }) => {
  const tooltipData = data.price_distribution[activeType];

  return (<ul className="group-info">
    <li>{data.name} — {activeType}</li>
    {/* - {activeSegment} */}
    {Object.keys(tooltipData).reverse().map((key) => {
      const currentItemInfo = DISTRIBUTION_GROUPS[key];

      return (<li key={key} className={(key === activeSegment) ? "group-current": ""}>
        <span className="group-color" style={{ backgroundColor: currentItemInfo.color[activeType] }} />
        <span className="group-label">{currentItemInfo.label}</span>
        <span className="group-percent">{tooltipData[key].percentage}%</span>
        <span className="group-count">{tooltipData[key].number_of_articles/1000}k</span>
      </li>);
    })}
  </ul>);
};

const AwaitingData = () => (<div>Awaiting Data</div>);

class PriceDistributionChart extends Component {
  state = {
    width: 500,
    height: 250,

    activeBar: null,
    activeType: null,
    activeSegment: null,

    formattedData: [],
  }

  componentDidMount() {
    this.formatData();
  }

  formatData() {
    const data = apiData;
    const formattedData = data.map((d) => {
      const preData = d.price_distribution.post;
      if (!Object.keys(preData).length) {
        const transformedData = cloneDeep(d);
        transformedData.price_distribution.post = {
          nodata: {
            percentage: 100
          }
        };

        return transformedData;
      }

      return d;
    });

    this.setState({ formattedData });
  }

  highlightSegment = (data, index, { target }) => (target.setAttribute('stroke', '#000'))
  clearHighlight = (data, index, { target }) => (target.setAttribute('stroke', null))

  getSegmentCallback = (key) => {
    const segmentKey = key.split('.')[2];

    return () => this.setState({
      activeSegment: segmentKey
    });
  }


  setTooltipCallback(barType) {
    return (data, index, { clientX, clientY }) => {
      console.log('TC', clientX < data.x);
      this.setState({
        activeBar: data.name,
        activeType: barType
      });
    }
  }

  clearTooltipState = () => {
    this.setState({
      activeBar: null,
      activeType: null,
      activeSegment: null
    })
  }

  renderTooltip = (...all) => {
    const { formattedData, activeBar, activeType, activeSegment } = this.state;
    const currentCompetitor = formattedData.filter(d => d.name === activeBar)[0];
    const hasPostData = !(currentCompetitor && currentCompetitor.price_distribution.post.nodata);

    const hasNoData = (!hasPostData && activeType === "post");

    if (!currentCompetitor) return;

    return (<div className={`f-tooltip ${hasNoData ? 'nodata' : ''}`}>
      {hasNoData ?
        <AwaitingData />
      :
        <TooltipContent data={currentCompetitor} activeType={activeType} activeSegment={activeSegment} />
      }
    </div>);
  }

  render() {
    const { width, height, formattedData } = this.state;

    return (<section className="f-bar chart-wrapper">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={formattedData}
          labelKey="name"
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
          barGap={2}
          barSize={30}
        >
          <XAxis dataKey="name" tickCount={formattedData.length} tickLine={false} interval={0} />
          <YAxis tickLine={false} tickFormatter={t => (t && `${t}%`)} domain={[0, 100]} />
          <CartesianGrid vertical={false} />

          <Tooltip cursor={false} content={this.renderTooltip} offset={32} />

          {GROUPINGS_PRE.map((group, i) => (
            <Bar
              dataKey={group.key} name={group.label}
              stackId="pre" key={`pre-${i}`}
              fill={group.color}
              onMouseEnter={this.setTooltipCallback('pre')}
              onMouseLeave={this.clearTooltipState}
              onMouseOver={this.highlightSegment}
              onMouseOut={this.clearHighlight}
              shape={<Rectangle onMouseEnter={this.getSegmentCallback(group.key)} />}
            />
          ))}

          {GROUPINGS_POST.map((group, i) => (
            <Bar
              dataKey={group.key} name={group.label}
              stackId="post" key={`post-${i}`}
              fill={group.color}
              onMouseEnter={this.setTooltipCallback('post')}
              onMouseLeave={this.clearTooltipState}
              onMouseOver={this.highlightSegment}
              onMouseOut={this.clearHighlight}
              shape={<Rectangle onMouseEnter={this.getSegmentCallback(group.key)} />}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </section>);
  }
}

export default PriceDistributionChart;
