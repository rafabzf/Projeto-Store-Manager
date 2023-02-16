const camelize = require('camelize');
const connection = require('./connection');

const salesDelete = async (idSale) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;', [idSale],
  );

  return camelize(result);
};

const salesList = async () => {
  const [res] = await connection.execute(
    `SELECT 
    sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM
    StoreManager.sales_products AS sp
        INNER JOIN
    StoreManager.sales AS s
    ON s.id = sp.sale_id;`,
  );

  return camelize(res);
};

const salesListId = async (id) => {
  const [res] = await connection.execute(
    `SELECT 
    sp.product_id, sp.quantity, s.date
FROM
    StoreManager.sales_products AS sp
        INNER JOIN
    StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE s.id = ?;`, [id],
  );

  return camelize(res);
};

const salesRegister = async (sales) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUE (NOW())');

  const productsSales = sales.map(
    ({ productId, quantity }) => `(${insertId}, ${productId}, ${quantity})`,
  ).join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products
     (sale_id, product_id, quantity) VALUES ${productsSales}`,
  );

  return insertId;
};

const salesUp = async (idSale, sales) => {
  const [deleteResult] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [idSale],
  );

  const productsSales = sales.map(
    ({ productId, quantity }) => `(${idSale}, ${productId}, ${quantity})`,
  ).join(', ');

  await connection.execute(
    `INSERT INTO
    StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES ${productsSales}`,
  );

  return deleteResult;
};

module.exports = {
  salesRegister,
  salesList,
  salesListId,
  salesDelete,
  salesUp,
};