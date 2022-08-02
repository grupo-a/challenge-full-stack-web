const sinon = require('sinon');
const { expect } = require('chai');
const { User } = require('../../../models');
const { dataDb, bodyCreate } = require('../Mock');
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

  describe('#FindOne', () => {
    afterEach(sinon.restore);
    it('Cadastrando um estudando no banco', async () => {
      sinon.stub(User, 'findOne').resolves(false);
      sinon.stub(User, 'create').resolves(dataDb[0]);
      const data = await model.registerStudent(123, 'Alessandro', '432.322.432-59', 'Alessandro@gmail.com');
      expect(data).to.be.equal(dataDb[0]);
    });
    it('Se o estudando ja estiver no banco retornar "existing student"', async () => {
      sinon.stub(User, 'findOne').resolves(true);
      const data = await model.registerStudent(123, 'Alessandro', '432.322.432-59', 'Alessandro@gmail.com');

      expect(data.message).to.be.equal('existing student');
    });
  });

});