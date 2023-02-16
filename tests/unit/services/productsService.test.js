const { expect } = require('chai');
const sinon = require('sinon');

const { modelProducts } = require('../../../src/models');

const { serviceProducts } = require('../../../src/services');

const { products, productNew, arroz, ovo, productInvalid, notFoundProduct } = require('./mocks/productsService.mock');

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
  });

  describe('Testa se deleta um produto', () => {
    it('Testa se não retorna erro caso o id seja existente', async () => {

      sinon.stub(modelProducts, 'productsList').resolves(products);

      sinon.stub(modelProducts, 'productUp').resolves({ affectedRows: 1 });

      const res = await serviceProducts.productDeleteId(1);

      expect(Object.keys(res).length).to.be.deep.equal(0);
    });

    it('Testa se retorna um erro quando o id é inexistente', async () => {

      sinon.stub(modelProducts, 'productsList').resolves(products);

      const res = await serviceProducts.productDeleteId(15);

      expect(res).to.be.deep.equal(notFoundProduct);
    });
  });

  describe('Testa se atualiza um produto', () => {
    it('Testa se retorna um erro, caso o id seja inválido', async () => {

      sinon.stub(modelProducts, 'productsList').resolves(products);

      const res = await serviceProducts.productUp({ name: 'Macarrão' }, 556766);

      expect(res).to.be.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: 'Product not found',
      });
    });

    it('Testa se retorna um erro, caso apenas o id seja válido e o nome curto demais', async () => {

      const res = await serviceProducts.productUp({ name: 'Ovo' }, 1);

      expect(res).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('Testa se atualiza caso o id seja válido', async () => {

      sinon.stub(modelProducts, 'productsList').resolves(products);

      sinon.stub(modelProducts, 'productUp').resolves({ affectedRows: 1 });

      sinon.stub(modelProducts, 'productsById').resolves(productNew);

      const res = await serviceProducts.productUp(productNew, 1);

      expect(res).to.be.deep.equal({
        type: null,
        message: productNew,
      });
    });

  });
  
  afterEach(function () {
    sinon.restore();
  });
});