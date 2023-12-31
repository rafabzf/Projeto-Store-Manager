const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { controllerProducts } = require('../../../src/controllers');

const { serviceProducts } = require('../../../src/services');

const {
  products,
  paoP,
  notFound,
  resPao,
  fubaP,
  resFuba,
  paoStub,
  fubaStub,
} = require('./mocks/products.controller.mock');

describe('Testando controller de produtos', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('Lista de produtos', () => {
    it('Testa se retorna a lista de produtos com o status 200', async function () {
      
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon
        .stub(serviceProducts, 'productsList')
        .resolves({
          type: null,
          message: products,
        });
      
      await controllerProducts.productsList(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Testando a busca de produto por id', () => {
    it('Testa se retorna os dados do produto e o status 200', async function () {

      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(serviceProducts, 'productsById')
        .resolves({
          type: null,
          message: products[0],
        });
      
      await controllerProducts.productsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

    it('Testa se retorna um erro ao passar um id que não existe', async () => {
      
      const res = {};
      const req = {
        params: { id: 8898 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(serviceProducts, 'productsById')
        .resolves(notFound);
      
      await controllerProducts.productsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found"
      });
    });
  });

  describe('Testa o cadastro de um novo produto', () => {
    it('Testa cadastro do produto "pão"', async () => {
      
      const req = {
        body: paoP,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(
        serviceProducts, 'productRegister',
      ).resolves(paoStub);

      await controllerProducts.productRegister(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(paoStub.message);
    });

    // it('Testa cadastro do produto "fubá"', async () => {

    //   const req = {
    //     body: fubaP,
    //   };
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon.stub(
    //     serviceProducts, 'productRegister',
    //   ).resolves(fubaStub);

    //   await controllerProducts.productRegister(req, res);

    //   expect(res.status).to.have.been.calledWith(422);
    //   expect(res.json).to.have.been.calledWith(fubaStub.message);
    // });
  });

  describe('Testa a atualização de produtos', () => {
    it('Testa se retorna uma mensagem e o status 404, se o id não existir', async () => {
      const req = {
        params: 556878,
        body: { name: 'Manteiga' },
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(serviceProducts, 'productUp')
        .resolves(notFound);
      
      await controllerProducts.productUp(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: notFound.message });
    });

    it('Testa se retorna o produto e o status 200, se o id existir', async () => {
      const req = {
        params: 556878,
        body: paoP,
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(serviceProducts, 'productUp')
        .resolves(paoStub);

      await controllerProducts.productUp(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(paoStub.message);
    });
  });

  describe('Testa se deleta os produtos', () => {
    it('Testa se retorna uma mensagem e o status 404, se o id não existir', async () => {
      const req = {
        params: 556878,
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(serviceProducts, 'productDeleteId')
        .resolves(notFound);

      await controllerProducts.productDeleteId(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: notFound.message });
    });

    // it('Testa se retorna o status 204, se o id existir', async () => {
    //   const req = {
    //     params: {id: 2},
    //     body: {name: 'Manteiga'},
    //   };

    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.end = sinon.stub().returns();

    //   sinon
    //     .stub(serviceProducts, 'productDeleteId')
    //     .resolves({});

    //   await controllerProducts.productDeleteId(req, res);

    //   expect(res.status).to.have.been.calledWith(204);
    // });
  });
});