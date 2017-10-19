import React, { PureComponent } from 'react';

import { AgGridReact } from 'ag-grid-react';

const competitors = ['VC', 'Competitor 1', 'Competitor 2', 'Competitor 3', 'Competitor 4'];
const stores = ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5', 'Store 6', 'Store 7', 'Store 8', 'Store 9', 'Store 10'];

const getData = () => (Array.from(new Array(10000), () => ({
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
})));

const getColumnFieldMeta = (headerName, field, pinned = '') => ({
  headerName,
  field,
  pinned,
  suppressMenu: true,
  suppressMovable: true,
  suppressResize: true
});

const getColumnValueGetterMeta = (headerName, valueGetter, pinned = '') => ({
  headerName,
  valueGetter,
  pinned,
  suppressMenu: true,
  suppressMovable: true,
  suppressResize: true
});

const columnDefs = [
  getColumnFieldMeta("Product Key", "productKey", "left"),
  getColumnFieldMeta("Product Name", "productName", "left"),
  {
    headerName: "Metro",
    children: [
      getColumnFieldMeta("Store Name", "metro.storeName"),
      getColumnFieldMeta("Buying Price", "metro.buyingPrice"),
      getColumnFieldMeta("Price", "metro.price")
    ]
  }
];

competitors.forEach((competitor, index) => {
  columnDefs.push({
    headerName: competitor,
    children: [
      getColumnValueGetterMeta("Store Name", `data.competitors[${index}].storeName`),
      getColumnValueGetterMeta("Price", `data.competitors[${index}].price`)
    ]
  });
})

class AgGrid extends PureComponent {
  state = {}

  render() {

    return (<section className="ag-grid">
      <h3>Ag Grid</h3>
      <div className="ag-table ag-fresh">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={getData()}
          rowSelection="single"
          rowHeight={50}
          suppressCellSelection
          suppressTabbing
          suppressContextMenu
          suppressToolPanel
          onRowSelected={({ data, node }) => {
            if (node.isSelected()) {
              console.log('Selected:', data.productKey, data);
            }
          }}
        />
      </div>
    </section>);
  }
}

export default AgGrid;
