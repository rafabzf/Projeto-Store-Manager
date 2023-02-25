const {
  schema,
  productRegisterSchema,
  salesRegisterSchema,
} = require('./schemas');

const idValidation = (id) => {
  const { error } = schema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' }; 

  return {
    type: null,
    message: '',
  };
};

const registerValidation = (product) => {
  const { error } = productRegisterSchema.validate(product);

  if (error) {
    return {
      type: product.name ? 'INVALID_VALUE' : 'UNDEFINED_VALUE',
      message: error.message,
    };
  }

  return {
    type: null,
    message: '',
  };
};

const registerValidationSales = (sales, productsList) => {
  const errorSa = sales.map((i) => salesRegisterSchema.validate(i));

  if (errorSa.some((i) => i.error)) {
    const { error } = errorSa.find((i) => i.error);

    return {
      type: error.message
        .includes('required') ? 'UNDEFINED_VALUE' : 'INVALID_VALUE',
        message: error.message,
    };
  }

  const productsIds = productsList.map(({ id }) => +id);

  if (sales.some(({ productId }) => !productsIds.includes(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return {
    type: null,
    message: '',
  };
};

const salesValidationId = (sales, id) => {
  const salesId = sales.map(({ idSale }) => idSale);

  if (!salesId.includes(id)) {
    return {
      type: 'SALE_NOT_FOUND',
      message: 'Sale not found',
    };
  }

  return {
    type: null,
    message: '',
  };
};

const upSalesValidation = (sales, productsList, salesList, idSale) => {
  let error = registerValidationSales(sales, productsList);

  if (error.type) return error;

  error = salesValidationId(salesList, idSale);

  if (error.type) return error;

  return {
    type: null,
    message: '',
  };
};

module.exports = {
  idValidation,
  registerValidation,
  registerValidationSales,
  salesValidationId,
  upSalesValidation,
};