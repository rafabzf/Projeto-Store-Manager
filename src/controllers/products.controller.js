const { mapError } = require('../utils/errorMap');

const { serviceProducts } = require('../services/index');

const productDeleteId = async (req, res) => {
  const { type, message } = await serviceProducts.productDeleteId(Number(req.params.id));

  if (type) return res.status(mapError(type)).json({ message });

  return res
    .status(200)
    .end();
};

const productsList = async (_req, res) => {
  const { message } = await serviceProducts.productsList();

  // if (type) return res.status(500).json(message);

  return res.status(200).json(message);
};

const productsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await serviceProducts.productsById(id);
  
  if (type) return res.status(mapError(type)).json({ message });

  res.status(200)
  .json(message);
};

const productRegister = async (req, res) => {
  const { type, message } = await serviceProducts.productRegister(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const productSearch = async (req, res) => {
  const { que } = req.query;

  const { message } = await serviceProducts.productSearch(que);

  return res
    .status(200)
    .json(message);
};

const productUp = async (req, res) => {
  const { type, message } = await serviceProducts.productUp(req.body, Number(req.params.id));

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  productDeleteId,
  productsList,
  productsById,
  productRegister,
  productSearch,
  productUp,
};