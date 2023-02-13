const { expect } = require('chai');
const sinon = require('sinon');

const { modelProducts } = require('../../../src/models');

const { serviceProducts } = require('../../../src/services');

const { products, productNew, arroz, ovo, productInvalid } = require('./mocks/productsService.mock');

describe('Testa service de produtos', () => {
  describe('Testa a listagem de produtos', () => {
    it('Testa se retorna toda a lista dos produtos', async () => {

      sinon.stub(modelProducts, 'productsList').resolves(products);

      const res = await serviceProducts.productsList();

      expect(res.type).to.be.equal(null);
      expect(res.message).to.deep.equal(products);
    });
  });

  describe('Testa a busca de um produto pelo id', () => {
    it('Teste se retorna um erro caso o produto não exista', async () => {
      
      sinon.stub(modelProducts, 'productsById').resolves(undefined);

      const res = await serviceProducts.productsById(12);

      expect(res.type).to.equal("PRODUCT_NOT_FOUND");
      expect(res.message).to.equal("Product not found");
    });

    it('Testa se retorna o produto pelo id', async () => {

      sinon.stub(modelProducts, 'productsById').resolves(products[0]);

      const res = await serviceProducts.productsById(1);

      expect(res.type).to.equal(null);
      expect(res.message).to.deep.equal(products[0]);
    });
  });

  describe('Testa o cadastro de um novo produto', () => {
    it('Testa o produto "Arroz"', async () => {

      sinon.stub(modelProducts, "productRegister").resolves(4);

      sinon.stub(modelProducts, "productsById").resolves({
        id: 4,
        name: "Arroz",
      });

      const res = await serviceProducts.productRegister(productNew);

      expect(res).to.be.deep.equal(arroz);
    });

    it('Testa o produto "Ovo"', async () => {

      sinon.stub(modelProducts, "productRegister").resolves(4);

      sinon.stub(modelProducts, "productsById").resolves({
        id: 4,
        name: "Arroz",
      });

      const res = await serviceProducts.productRegister(productInvalid);

      expect(res).to.be.deep.equal(ovo);
    });
  })
  
  afterEach(function () {
    sinon.restore();
  });
});