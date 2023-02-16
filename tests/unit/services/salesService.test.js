const { expect } = require('chai');
const { afterEach } = require('mocha');
const sinon = require('sinon');
const { modelSales, modelProducts } = require('../../../src/models');
const { serviceSales } = require('../../../src/services');

const {
  products,
  listSales,
  salesRes,
  salesResId,
  salesResIdInvalid,
  noSalesId,
  noSalesQuantity,
  salesQuantityInvalid,
  salesIdInvalid,
  salesValid,
  noSalesIdRes,
  noSalesQuantityRes,
  salesQuantityResInvalid,
  salesResProductIdInvalid,
  salesResValid,
} = require('./mocks/serviceSales.mock');

describe('Testa o service de vendas', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa a listagem de vendas', () => {
    // it('Testa a venda com o id', async () => {

    //   sinon.stub(modelSales, 'salesList').resolves(listSales);

    //   sinon.stub(modelSales, 'salesListId').resolves(listSales[0]);

    //   const res = await serviceSales.salesListId(1);

    //   expect(res).to.be.deep.equal(salesResId);
    // });

    it('Testa as vendas totais', async () => {

      sinon.stub(modelSales, 'salesList').resolves(listSales);

      const res = await serviceSales.salesList();

      expect(res).to.be.deep.equal(salesRes);
    });

    it('Testa uma venda com o id inválido', async () => {

      sinon.stub(modelSales, 'salesList').resolves(listSales);

      const res = await serviceSales.salesListId(8);

      expect(res).to.be.deep.equal(salesResIdInvalid);
    });
  });

  describe('Testa o registro das vendas', () => {
    it('Testa o registro com "productId" inválido', async () => {

      const res = await serviceSales.salesRegister(noSalesId);

      expect(res).to.be.deep.equal(noSalesIdRes);
    });

    it('Testa o registro com "quantity" inválido', async () => {

      const res = await serviceSales.salesRegister(noSalesQuantity);

      expect(res).to.be.deep.equal(noSalesQuantityRes);
    });

    it('Testa o registro com "quantity" menor ou igual a 0', async () => {

      const res = await serviceSales.salesRegister(salesQuantityInvalid);

      expect(res).to.be.deep.equal(salesQuantityResInvalid);
    });

    it('Testa o registro com "productId" inexistente', async () => {

      sinon.stub(modelProducts, 'productsList').resolves(products);

      const res = await serviceSales.salesRegister(salesIdInvalid);

      expect(res).to.be.deep.equal(salesResProductIdInvalid);
    });

    // it('Testa o registro quando a venda é válida', async () => {

    //   sinon.stub(modelProducts, 'productsList').resolves(products);

    //   sinon.stub(modelSales, 'salesRegister').resolves(3);

    //   const res = await serviceSales.salesRegister(salesValid);

    //   expect(res).to.be.deep.equal(salesResValid);
    // });
  });
});