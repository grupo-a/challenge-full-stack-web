const { expect } = require('chai');
const Sinon = require('sinon');
const listModel = require('../../Model');
const listService = require('../../Service');
const { dataDb, bodyCreate } = require('../Mock');


describe('Service', function () {
  describe('#getAll', function () {
    it('Deve retornar um array de obj quando tem dados no banco', async function () {
      Sinon.stub(listModel, 'getAll').resolves(dataDb);
      const data = await listService.getAll();
      expect(data).to.deep.eq(dataDb);
      Sinon.restore();
    });
    it('Sem dados no Db deve retornar um array vazio', async function () {
      Sinon.stub(listModel, 'getAll').resolves([]);
      const data = await listService.getAll();
      expect(data).to.be.empty;
    });
  });
  
});