const { modelSales, modelProducts } = require('../models');

const {
  registerValidationSales,
  salesValidationId,
  upSalesValidation,
} = require('./inputValidations');

const salesDelete = async (id) => {
  const salesList = await modelSales.salesList();

  const error = salesValidationId(salesList, id);

  if (error.type) {
    return error;
  }

  await modelSales.salesDelete(id);
  return {};
};

const salesList = async () => {
  const sale = await modelSales.salesList();
  return { type: null, message: sale };
};

const salesListId = async (id) => {
  const sale = await modelSales.salesList();

  // const idList = sale.map(({ idSale }) => idSale);

  // if (!idList.includes(id)) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  // return {
  //   type: null,
  //   message: await modelSales.salesListId(id),
  // };

  const error = salesValidationId(sale, id);

  if (error.type) {
    return error;
  }

  return {
    type: null,
    message: await modelSales.salesListId(id),
  };
};

const salesRegister = async (sales) => {
  const products = await modelProducts.productsList();

  const error = registerValidationSales(sales, products);

  if (error.type) return error;

  // const productsId = products.map(({ id }) => +id);

  // if (sales.some(({ productId }) => !productsId.includes(productId))) {
  //   return {
  //     type: 'PRODUCT_NOT_FOUND',
  //     message: 'Product not found',
  //   };
  // }

  const idSale = await modelSales.salesRegister(sales);

  const saleNew = {
    id: idSale,
    itemsSold: sales,
  };

  return {
    type: null, message: saleNew,
  };
};

const salesUp = async (upSaleId, sales) => {
  const listProducts = await modelProducts.productsList();

  const listSales = await modelSales.salesList();

  const error = upSalesValidation(sales, listProducts, listSales, upSaleId);

  if (error.type) return error;

  await modelSales.salesUp(upSaleId, sales);

  const salesNew = {
    idSale: upSaleId,
    itemsUpdated: sales,
  };

  return {
    type: null,
    message: salesNew,
  };
};

module.exports = {
  salesDelete,
  salesList,
  salesRegister,
  salesListId,
  salesUp,
};