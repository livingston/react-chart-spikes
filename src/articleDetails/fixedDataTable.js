import React, { PureComponent } from 'react';
import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table-2';
import { get } from 'lodash';
import Dimensions from 'react-dimensions';

const competitors = ['VC', 'Competitor 1', 'Competitor 2', 'Competitor 3', 'Competitor 4'];
const stores = ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5', 'Store 6', 'Store 7', 'Store 8', 'Store 9', 'Store 10'];

const data = Array.from(new Array(10000), () => ({
  productKey: chance.ssn({ dashes: false }),
  productName: chance.sentence({ words: 2 }).replace(/\./, ''),
  metro: {
    storeName: chance.pickone(stores),
    buyingPrice: chance.floating({ min: 40, max: 60, fixed: 2 }),
    price: chance.floating({ min: 40, max: 60, fixed: 2 })
  },
  competitors: competitors.map((competitor, index) => ({
    name: competitor,
    storeName: chance.pickone(stores),
    price: chance.floating({ min: 40, max: 60, fixed: 2 })
  }))
}));

const competitorColumns = competitors.map((competitor, index) => ({
  header: competitor,
  storeNameKey: `competitors[${index}].storeName`,
  priceKey: `competitors[${index}].price`
}));

const RowCell = ({ rowIndex, columnKey, data, ...props }) => (<Cell {...props}>
  {get(data[rowIndex], columnKey)}
</Cell>);

class ArticleDetailsFDT extends PureComponent {
  state = {
    data,
    filterProductKey: '',
    filterProductName: ''
  }

  static compareValue(value, searchTerm) {
    return !searchTerm || String(value).toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1;
  }

  get filteredData() {
    const { data, filterProductKey, filterProductName } = this.state;
    const compareValue = this.constructor.compareValue;

    return data.filter(article => {

      return compareValue(article.productKey, filterProductKey) && compareValue(article.productName, filterProductName)
    });
  }

  updateFilterFor = (filterKey) => ({ target }) => {
    this.setState({
      [filterKey]: target.value
    })
  }

  render() {
    const { containerWidth, containerHeight } = this.props;
    const filteredData = this.filteredData;

    return (
    <Table
      rowHeight={50}
        rowsCount={filteredData.length}
      width={containerWidth}
      height={containerHeight}
      headerHeight={50}
      groupHeaderHeight={50}
      data={filteredData}
      onRowClick={(event, rowIndex) => console.log(data[rowIndex])}
    >
      <ColumnGroup
        header=""
        width={200}
        fixed={true}
      >
        <Column
          width={200}
          fixed={true}
          columnKey="productKey"
          header={<Cell className="full-height-column">
            Product Key
            <input type="text" onChange={this.updateFilterFor('filterProductKey')} />
          </Cell>}
          cell={<RowCell data={filteredData} />}
        />
      </ColumnGroup>
      <ColumnGroup
        header=""
        width={200}
        fixed={true}
      >
        <Column
          fixed={true}
          columnKey="productName"
          header={<Cell className="full-height-column">
            Product Name
            <input type="text" onChange={this.updateFilterFor('filterProductName')} />
          </Cell>}
          cell={<RowCell data={filteredData} />}
          width={200}
        />
      </ColumnGroup>

      <ColumnGroup
        align='center'
        header="Metro"
        width={200}
      >
        <Column
          columnKey="metro.storeName"
          header={<Cell>Store Name</Cell>}
          cell={<RowCell data={filteredData} />}
          width={100}
          flexGrow={1}
        />
        <Column
          columnKey="metro.buyingPrice"
          header={<Cell>Buying Price</Cell>}
          cell={<RowCell data={filteredData} />}
          width={100}
          flexGrow={1}
        />
        <Column
          columnKey="metro.price"
          header={<Cell>Price</Cell>}
          cell={<RowCell data={filteredData} />}
          width={100}
          flexGrow={1}
        />
      </ColumnGroup>

      {competitorColumns.map(competitor => (<ColumnGroup
        align="center"
        header={competitor.header}
        width={200}
        key={competitor.header}
      >
        <Column
          columnKey={competitor.storeNameKey}
          header={<Cell>Store Name</Cell>}
          cell={<RowCell data={filteredData} />}
          width={100}
          flexGrow={1}
        />
        <Column
          columnKey={competitor.priceKey}
          header={<Cell>Price</Cell>}
          cell={<RowCell data={filteredData} />}
          width={100}
          flexGrow={1}
        />
      </ColumnGroup>))}
    </Table>);
  }
}

export default Dimensions()(ArticleDetailsFDT);
