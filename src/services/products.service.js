const schema = require('./inputValidations');
const { modelProducts } = require('../models');

const productDeleteId = async (idProduct) => {
  const products = await modelProducts.productsList();

  const productsIds = products.map(
    ({ id }) => +id,
  );

  if (!productsIds.includes(idProduct)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await modelProducts.productDeleteId(idProduct);
  return {};
};

const productsList = async () => {
  const products = await modelProducts.productsList();

  return {
    type: null,
    message: products,
  };
};

const productsById = async (idProduct) => {
  const product = await modelProducts.productsById(idProduct);

  if (!product) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }

  return {
    type: null,
    message: product,
  };
};

const productRegister = async (product) => {
  const erro = schema.registerValidation(product);

  if (erro.type) {
    return erro;
  }

  const productId = await modelProducts.productRegister(
    product.name,
  );

  const productNew = await modelProducts.productsById(
    productId,
  );

  return { type: null, message: productNew };
};

const productSearch = async (searchTerm) => {
  const que = await modelProducts.productSearch(searchTerm);

  return {
    type: null,
    message: que,
  };
};

const productUp = async (product, idProduct) => {
  const error = schema.registerValidation(product);

  if (error.type) return error;

  const products = await modelProducts.productsList();

  const idsProducts = products.map(({ id }) => +id);

  if (!idsProducts.includes(idProduct)) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }

  await modelProducts.productUp(product.name, idProduct);

  const productNew = await modelProducts.productsById(idProduct);

  return {
    type: null,
    message: productNew,
  };
};

module.exports = {
  productDeleteId,
  productsList,
  productsById,
  productRegister,
  productSearch,
  productUp,
};