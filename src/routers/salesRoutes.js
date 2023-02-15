const express = require('express');

const { controllerSales } = require('../controllers');

const route = express.Router();

route.get('/', controllerSales.salesList);

route.get('/:id', controllerSales.salesListId);

route.post('/', controllerSales.salesRegister);

route.delete('/:id', controllerSales.salesDelete);

route.put('/:id', controllerSales.salesUp);

module.exports = route;