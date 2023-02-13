const express = require('express');

const { controllerProducts } = require('../controllers');

const routes = express.Router();

routes.get('/', controllerProducts.productsList);

routes.get('/:id', controllerProducts.productsById);

routes.post('/', controllerProducts.productRegister);

routes.put('/:id', controllerProducts.productUp);

module.exports = routes;