const express = require('express');

const { controllerProducts } = require('../controllers');

const routes = express.Router();

routes.get('/', controllerProducts.productsList);

routes.post('/', controllerProducts.productRegister);

routes.get('/search', controllerProducts.productSearch);

routes.get('/:id', controllerProducts.productsById);

routes.put('/:id', controllerProducts.productUp);

routes.delete('/:id', controllerProducts.productDeleteId);

module.exports = routes;