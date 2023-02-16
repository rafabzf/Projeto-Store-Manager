const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel, modelSales } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { salesList } = require("../../../src/models/salesModel");

const {
  list,
  saleValid,
} = require('./mocks/productsModel.mock');

describe('Testa o model de vendas', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa a listagem de vendas', () => {
    // it('Testa a venda com o id', async () => {
      
    //   sinon.stub(connection, 'execute').resolves([list[0]]);

    //   const res = await modelSales.salesListId(1);

    //   expect(res).to.be.deep.equal(list[0]);
    // });

    it('Testa as vendas totais', async () => {

      sinon.stub(connection, 'execute').resolves([list]);

      const res = await modelSales.salesList();

      expect(res).to.be.deep.equal(list);
    });
  });

  // describe('Testa o registro de vendas', () => {
  //   it('Testa o registro de uma venda válida', async () => {

  //     sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

  //     const res = await modelSales.salesRegister(saleValid);

  //     expect(res).to.be.deep.equal(4);
  //   });
  // });
});