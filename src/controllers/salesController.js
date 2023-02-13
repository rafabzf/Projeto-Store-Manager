const { serviceSales } = require('../services');

const { mapError } = require('../utils/errorMap');

const salesList = async (_req, res) => {
  const { type, message } = await serviceSales.salesList();

  if (type) {
    return res
      .status(mapError(type))
      .json({ message });
  }
  
  res
    .status(200)
    .json(message);
};

const salesListId = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await serviceSales.salesListId(Number(id));

  if (type) {
    return res
      .status(mapError(type))
      .json({ message }); 
}

  return res
    .status(200)
    .json(message);
};

const salesRegister = async (req, res) => {
  const { type, message } = await serviceSales.salesRegister(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  return res
    .status(201)
    .json(message);
};

module.exports = {
  salesRegister,
  salesList,
  salesListId,
};