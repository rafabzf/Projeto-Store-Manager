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

const paoP = {
  name: "Pão francês"
};

const fubaP = {
  name: "Fubá"
};

const paoStub = {
  type: null,
  message: { id: 7, name: "Pão francês" },
};
const fubaStub = {
  type: 'INVALID_VALUE',
  message: '"name" length must be at least 5 characters long',
};

const notFound = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

module.exports = {
  products,
  paoP,
  fubaP,
  paoStub,
  fubaStub,
  notFound,
};