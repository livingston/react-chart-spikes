import React, { PureComponent } from 'react';
import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table-2';
import { get } from 'lodash';

const competitors = ['Virtual Competitor', 'Aldi', 'Lidl', 'Ahold', 'Jumbo'];

const data = Array.from(new Array(10), () => ({
  productKey: chance.ssn({ dashes: false }),
  productName: chance.sentence({ words: 2 }).replace(/\./, ''),
  metro: {
    storeName: chance.sentence({ words: 2 }).replace(/\./, ''),
    buyingPrice: chance.floating({ min: 40, max: 60, fixed: 2 }),
    price: chance.floating({ min: 40, max: 60, fixed: 2 })
  },
  competitors: competitors.map((competitor, index) => ({
    name: competitor,
    storeName: chance.sentence({ words: 2 }).replace(/\./, ''),
    price: chance.floating({ min: 40, max: 60, fixed: 2 })
  }))
}));

const RowCell = ({ rowIndex, columnKey, data, ...props }) => (<Cell {...props}>
  {get(data[rowIndex], columnKey)}
</Cell>);

class ArticleDetailsFDT extends PureComponent {

  render() {
    return (<Table
      rowHeight={50}
      rowsCount={10}
      width={1000}
      height={500}
      headerHeight={50}
      data={data}
    >
      <ColumnGroup
        header="Metro2"
        width={150}
        fixed={true}
      >
        <Column
          width={100}
          fixed={true}
          columnKey="productKey"
          header={<Cell>Product Key</Cell>}
          cell={<RowCell data={data} />}
        />
        <Column
          columnKey="productName"
          header={<Cell>Product Name</Cell>}
          cell={<RowCell data={data} />}
          width={10}
        />
      </ColumnGroup>
      <ColumnGroup
        align='center'
        header="Metro3"
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
      </ColumnGroup>
    </Table>);
  }
}

export default ArticleDetailsFDT;
