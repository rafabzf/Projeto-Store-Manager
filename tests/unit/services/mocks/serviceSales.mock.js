const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const listSales = [
  {
    saleId: 1,
    productId: 1,
    quantity: 10,
    date: "2023-01-17T17:19:25.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2023-01-17T17:19:25.000Z",
  },
];

const salesRes = {
  type: null,
  message: listSales,
};

const salesResId = {
  type: null,
  message: listSales[0],
};

const salesResIdInvalid = {
  type: "SALE_NOT_FOUND",
  message: 'Sale not found',
};

const noSalesId = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const noSalesQuantity = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
  },
];

const salesQuantityInvalid = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 0,
  },
];

const salesIdInvalid = [
  {
    productId: 565779,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesValid = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const noSalesIdRes = {
  type: "UNDEFINED_VALUE",
  message: '"productId" is required',
};

const noSalesQuantityRes = {
  type: "UNDEFINED_VALUE",
  message: '"quantity" is required', 
}

const salesQuantityResInvalid = {
  type: "INVALID_VALUE",
  message: '"quantity" must be greater than or equal to 1',
};

const salesResProductIdInvalid = {
  type: "PRODUCT_NOT_FOUND",
  message: 'Product not found',
};

const salesResValid = {
  type: null,
  message: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

module.exports = {
  products,
  listSales,
  salesRes,
  salesResId,
  salesResIdInvalid,
  noSalesId,
  noSalesQuantity,
  salesQuantityInvalid,
  salesIdInvalid,
  salesValid,
  noSalesIdRes,
  noSalesQuantityRes,
  salesQuantityResInvalid,
  salesResProductIdInvalid,
  salesResValid,
};