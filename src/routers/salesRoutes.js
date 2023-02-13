const express = require('express');

const { controllerSales } = require('../controllers');

const route = express.Router();

route.get('/', controllerSales.salesList);

route.get('/:id', controllerSales.salesListId);

route.post('/', controllerSales.salesRegister);

module.exports = route;