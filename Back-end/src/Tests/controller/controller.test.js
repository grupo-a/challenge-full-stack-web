const { expect } = require('chai');
const Sinon = require('sinon');
const service = require('../../Service');
const listController = require('../../Controller');
const { dataDb, bodyCreate } = require('../Mock');

describe('Controller', function () {
  let response = {};
  let request = {};
  before(function () {
    request.body = { };
    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
  });

  describe('#findAll', function () {
    it('Quando existe dados - Deve retornar o status 200', async function () {
      Sinon.stub(service, 'getAll').resolves(dataDb);
      await listController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(dataDb)).to.be.equal(true);
      Sinon.restore();
    });
    it('Deve retornar um array vazio', async function () {
      Sinon.stub(service, 'getAll').resolves([]);
      await listController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
      Sinon.restore();
    });  
  });

  describe('#Register', function () {
    it('Registrando um estudante - Deve retornar o status 201', async function () {
      Sinon.stub(service, 'registerStudent').resolves(dataDb[0]);
      request.body = { ra: 123, name: 'Alessandro', cpf: '432.432.765-54', email: 'ale@gmail.com'}
      await listController.registerStudent(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      Sinon.restore();
    });
    it('Registrando estudando sem o ra', async function () {
      Sinon.stub(service, 'getAll').resolves([]);
      request.body = { name: 'Alessandro', cpf: '432.432.765-54', email: 'ale@gmail.com'}
      await listController.getAll(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith()).to.be.equal(true);
      Sinon.restore();
    });  
  });

});