const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { salesList } = require("../../../src/models/salesModel");

const {
  list,
  saleValid,
  resSale,
} = require('./mocks/productsModel.mock');

describe('Testa o model de vendas', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa a listagem de vendas', () => {
    it('Testa a venda com o id', async () => {
      
      sinon.stub(connection, 'execute').resolves([list[0]]);

      const res = await salesModel.salesListId(1);

      expect(res).to.be.deep.equal(list[0]);
    });

    it('Testa as vendas totais', async () => {

      sinon.stub(connection, 'execute').resolves([list]);

      const res = await salesModel.salesList();

      expect(res).to.be.deep.equal(salesList);
    });
  });

  describe('Testa o registro de vendas', () => {
    it('Testa o registro de uma venda válida', async () => {

      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const res = await salesModel.salesRegister(saleValid);

      expect(res).to.be.deep.equal(4);
    });
  });
});