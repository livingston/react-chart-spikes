import React, { PureComponent } from 'react';

import { AgGridReact } from 'ag-grid-react';

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
          rowData={data}
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
