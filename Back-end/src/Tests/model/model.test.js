const sinon = require('sinon');
const { expect } = require('chai');
const { User } = require('../../../models');
const { dataDb } = require('../Mock');
const model = require('../../Model');

describe('Models', () => {
  beforeEach(() => sinon.restore());
  describe('#FindAll', () => {
    it('Quando tiver dados, deve retornar um array com as informações', async () => {
      sinon.stub(User, 'findAll').resolves(dataDb);
      const data = await model.getAll();
      expect(data).to.be.equal(dataDb);
    });
    it('Quando não tiver dados, deve retornar um array vazio', async () => {
      sinon.stub(User, 'findAll').resolves([]);
      const data = await model.getAll();
      expect(data).to.be.empty;
    });
  });

});