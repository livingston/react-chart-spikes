import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import { get } from 'lodash';
import 'chance';

const getCompetitorColumns = (index) => ([{
  Header: 'Store Name',
  accessor: `competitors[${index}].storeName`
}, {
  Header: 'Price',
  accessor: `competitors[${index}].price`
}]);

const columnData = [{
  Header: 'Product Key',
  accessor: 'productKey'
}, {
  Header: 'Product Name',
  accessor: 'productName'
}, {
  Header: "Metro",
  columns: [{
    Header: 'Store Name',
    accessor: 'metro.storeName'
  }, {
    Header: 'Buying Price',
    accessor: 'metro.buyingPrice'
  }, {
    Header: 'Price',
    accessor: 'metro.price'
  }]
}];
const competitors = ['Virtual Competitor', 'Aldi', 'Lidl', 'Ahold', 'Jumbo'];

const data = Array.from(new Array(1000), () => ({
  productKey: chance.ssn({ dashes: false }),
  productName: chance.sentence().replace(/\./, ''),
  metro: {
    storeName: chance.sentence().replace(/\./, ''),
    buyingPrice: chance.floating({ min: 40, max: 60, fixed: 2 }),
    price: chance.floating({ min: 40, max: 60, fixed: 2 })
  },
  competitors: competitors.map((competitor, index) => ({
    name: competitor,
    storeName: chance.sentence().replace(/\./, ''),
    price: chance.floating({ min: 40, max: 60, fixed: 2 })
  }))
}));

competitors.forEach((competitor, index) => {
  columnData.push({
    Header: competitor,
    columns: getCompetitorColumns(index)
  })
});


class ArticleDetailsReactTable extends PureComponent {
  state = {}

  render() {
    return (<ReactTable
      data={data}
      columns={columnData}
      showPagination={false}
      defaultPageSize={1000}

      style={{
        height: '500px'
      }}
    />);
  }
}

export default ArticleDetailsReactTable;
