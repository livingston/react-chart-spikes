import React, { PureComponent } from 'react';
import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table-2';
import { get } from 'lodash';
import Dimensions from 'react-dimensions';

const competitors = ['Virtual Competitor', 'Aldi', 'Lidl', 'Ahold', 'Jumbo'];
const stores = ['Makro Braga', 'Makro Gaia', 'Makro Matosinhos', 'Makro Albufeira', 'Makro Faro', 'Makro Alfragide', 'Makro Cascais', 'Makro Coimbra', 'Makro Leiria', 'Makro Palmela'];

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
  render() {
    const { containerWidth, containerHeight } = this.props;

    return (
    <Table
      rowHeight={50}
      rowsCount={data.length}
      width={containerWidth}
      height={containerHeight}
      headerHeight={50}
      groupHeaderHeight={50}
      data={data}
      onRowClick={(event, rowIndex) => console.log(data[rowIndex])}
    >
      <ColumnGroup
        header=""
        width={100}
        fixed={true}
      >
        <Column
          width={100}
          fixed={true}
          columnKey="productKey"
          header={<Cell className="full-height-column">Product Key</Cell>}
          cell={<RowCell data={data} />}
        />
      </ColumnGroup>
      <ColumnGroup
        header=""
        width={150}
        fixed={true}
      >
        <Column
          fixed={true}
          columnKey="productName"
          header={<Cell className="full-height-column">Product Name</Cell>}
          cell={<RowCell data={data} />}
          width={150}
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
          cell={<RowCell data={data} />}
          width={100}
          flexGrow={1}
        />
        <Column
          columnKey="metro.buyingPrice"
          header={<Cell>Buying Price</Cell>}
          cell={<RowCell data={data} />}
          width={100}
          flexGrow={1}
        />
        <Column
          columnKey="metro.price"
          header={<Cell>Price</Cell>}
          cell={<RowCell data={data} />}
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
          cell={<RowCell data={data} />}
          width={100}
          flexGrow={1}
        />
        <Column
          columnKey={competitor.priceKey}
          header={<Cell>Price</Cell>}
          cell={<RowCell data={data} />}
          width={100}
          flexGrow={1}
        />
      </ColumnGroup>))}
    </Table>);
  }
}

export default Dimensions()(ArticleDetailsFDT);
