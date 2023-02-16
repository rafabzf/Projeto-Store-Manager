const { expect } = require('chai');
const sinon = require('sinon');

const { modelProducts } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { productRegister } = require('../../../src/models/products.model');

const { products, productNew } = require('./mocks/productsModel.mock');

describe('Testando model de produtos', () => {
  it('Testa se recupera a lista de produtos', async () => {
    
    sinon.stub(connection, 'execute').resolves([products]);

    const res = await modelProducts.productsList();

    expect(res).to.be.deep.equal(products);
  });

  it('Testa se recupe um produto pelo id', async () => {

    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const res = await modelProducts.productsById(1);

    expect(res).to.be.deep.equal(products[0]);
  });

  it('Testa se cadastra um novo produto', async () => {

    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    
    const res = await productRegister(productNew);

    expect(res).to.be.deep.equal(4);
  });

  it('Testa se deleta um produto', async () => {

    sinon.stub(connection, 'execute').resolves({ affectedRows: 1 })

    const res = await modelProducts.productDeleteId(1);

    expect(res).to.be.deep.equal({ affectedRows: 1 });
  });

  it('Testa se atualiza um produto válido', async () => {

    sinon.stub(connection, 'execute').resolves([{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: 'Rows matched: 1 Changed: 1 Warnings: 0',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 1,
    }]);

    const res = await modelProducts.productUp('Chocolate', 2);

    expect(res.changedRows).to.be.equal(1);
  })

  afterEach(function () {
    sinon.restore();
  });
});