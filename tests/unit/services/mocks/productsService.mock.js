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

const productNew = {
  name: "Arroz"
};

const productInvalid = {
  name: "Ovo"
};


const arroz = {
  type: null,
  message: { id: 4, name: "Arroz" }
};

const ovo = {
  type: "INVALID_VALUE",
  message: '"name" length must be at least 5 characters long'
};

module.exports = {
  products,
  productInvalid,
  productNew,
  arroz,
  ovo,
};