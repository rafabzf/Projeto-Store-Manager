const { modelSales, modelProducts } = require('../models');

const { registerValidationSales } = require('./inputValidations');

const salesList = async () => {
  const sale = await modelSales.salesList();
  return { type: null, message: sale };
};

const salesListId = async (id) => {
  const sale = await modelSales.salesList();

  const idList = sale.map(({ idSale }) => idSale);

  if (!idList.includes(id)) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return {
    type: null,
    message: await modelSales.salesListId(id),
  };
};

const salesRegister = async (sales) => {
  const error = registerValidationSales(sales);

  if (error.type) return error;

  const products = await modelProducts.productsList();
  const productsId = products.map(({ id }) => +id);

  if (sales.some(({ productId }) => !productsId.includes(productId))) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }

  const idSale = await modelSales.salesRegister(sales);

  const saleNew = {
    id: idSale,
    itemsSold: sales,
  };
  return {
    type: null, message: saleNew,
  };
};

module.exports = {
  salesRegister,
  salesList,
  salesListId,
};