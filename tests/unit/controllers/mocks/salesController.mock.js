const listSales = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2023-01--17T17:19:25.000Z",
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: "2023-01--17T17:19:25.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2023-01--17T17:19:25.000Z",
  },
];

const saleValidation = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 3,
    quantity: 5,
  },
];

const newSaleValidation = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 3,
      quantity: 5,
    },
  ],
};

const newSaleInvalidation = [
  {
    productId: 1090,
    quantity: 1,
  },
  {
    productId: 3,
    quantity: 5,
  },
];

const saleInvalidationId = {
  message: 'Sale not found',
};

module.exports = {
  listSales,
  saleValidation,
  newSaleValidation,
  newSaleInvalidation,
  saleInvalidationId,
};