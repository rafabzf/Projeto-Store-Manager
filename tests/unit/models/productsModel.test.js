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

    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])
    
    const res = await productRegister(productNew);

    expect(res).to.be.deep.equal(4);
  })

  afterEach(function () {
    sinon.restore();
  });
});