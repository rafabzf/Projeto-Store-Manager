// const camelize = require('camelize');

// const connection = require('./connection');

// const productDeleteId = async (idProduct) => {
//   const { affectedRows } = await connection.execute(
//     'DELETE FROM StoreManager.products WHERE id = ?;', [idProduct],
//   );

//   return { affectedRows };
// };

// const productsList = async () => {
//   const [res] = await connection.execute(
//     'SELECT * FROM StoreManager.products',
//   );
//   return camelize(res);
// };

// const productsById = async (idProduct) => {
//   const [[product]] = await connection.execute(
//     'SELECT * FROM StoreManager.products WHERE id = ?',
//     [idProduct],
//   );

//   return camelize(product);
// };

// const productRegister = async (name) => {
//   const [{ insertId }] = await connection.execute(
//     'INSERT INTO StoreManager.products (name) VALUE (?)', [name],
//   );

//   return insertId;
// };

// const productSearch = async (search) => {
//   const [result] = await connection.execute(
//     `SELECT * FROM StoreManager.products
//     WHERE name LIKE ? ;`,
//     [`%${search}%`],
//   );

//   return camelize(result);
// };

// const productUp = async (name, idProduct) => {
//   const [result] = await connection.execute(
//     `UPDATE StoreManager.products 
//     SET 
//     products.name = ?
//     WHERE
//     products.id = ?;`,
//     [name, idProduct],
//   );

//   return result;
// };

// module.exports = {
//   productsList,
//   productsById,
//   productRegister,
//   productUp,
//   productDeleteId,
//   productSearch,
// };
const camelize = require('camelize');

const connection = require('./connection');

const productsList = async () => {
  const [res] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(res);
};

const productsById = async (idProduct) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [idProduct],
  );

  return camelize(product);
};

const productRegister = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)', [name],
  );

  return insertId;
};

const productUp = async (name, idProduct) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products 
    SET 
    products.name = ?
    WHERE
    products.id = ?;`,
    [name, idProduct],
  );

  return affectedRows;
};

module.exports = {
  productsList,
  productsById,
  productRegister,
  productUp,
};