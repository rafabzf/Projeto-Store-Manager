const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { controllerSales } = require('../../../src/controllers');

const { serviceSales } = require('../../../src/services');

const {
  listSales,
  newSaleValidation,
  newSaleInvalidation,
  saleValidation,
} = require('./mocks/salesController.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando controller sales', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('Testa a lista de vendas', () => {
    it('Testa se retorna a lista de vendas com o status 200', async function () {

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon
        .stub(serviceSales, 'salesList')
        .resolves({
          type: null,
          message: listSales,
        });

      await controllerSales.salesList(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listSales);
    });

    it('Testa se retorna a venda com o status 200, quando o id é válido', async function () {

      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon
        .stub(serviceSales, 'salesListId')
        .resolves({
          type: null,
          message: listSales[0],
        });

      await controllerSales.salesListId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listSales[0]);
    });

    it('Testa se retorna a venda com o status 404, quando o id é inválido', async function () {

      const res = {};
      const req = { params: { id: 5566 } };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon
        .stub(serviceSales, 'salesListId')
        .resolves({
          type: 'SALE_NOT_FOUND',
          message: 'Sale not found',
        });

      await controllerSales.salesListId(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Testa o registro de vendas', () => {
    it('Testa se retorna a mensagem com o status 201', async function () {

      const res = {};
      const req = { body: newSaleValidation };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon
        .stub(serviceSales, 'salesRegister')
        .resolves({
          type: null,
          message: newSaleValidation,
        });

      await controllerSales.salesRegister(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleValidation);
    });

    it('Testa se retorna a mensagem com o status 404, quando a venda é inválida', async function () {

      const res = {};
      const req = { body: newSaleInvalidation };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon
        .stub(serviceSales, 'salesRegister')
        .resolves({
          type: 'PRODUCT_NOT_FOUND',
          message: 'Product not found',
        });

      await controllerSales.salesRegister(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});