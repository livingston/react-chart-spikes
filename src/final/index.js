import React, { Component } from 'react';
import Chart from './chart';

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

const Final = () => (<section className="f page">
  <Chart data={apiData}/>
</section>);

export default Final;
