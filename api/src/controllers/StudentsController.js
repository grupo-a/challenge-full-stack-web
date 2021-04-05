const StudentsRepository = require('../repositories/StudentsRepository');

const StudentsController = {
  store: async function(req, res) {
    const { body } = req;
    const student = await StudentsRepository.create(body);

    return res.status(201).json(student);
  },
  index: async function(req, res) {
    const students = await StudentsRepository.findAll();
    return res.status(200).json(students);
  },
  show: async function(req, res) {
    const { id } = req.params;

    const student = await StudentsRepository.findById(id);
    return res.status(200).json(student);
  },
  update: async function(req, res) {
    const { id } = req.params;
    const { body } = req;

    const student = await StudentsRepository.update(id, body);
    return res.status(200).json(student);
  },
  delete: async function (req, res) {
    const { id } = req.params;

    await StudentsRepository.delete(id);

    return res.status(200);
  }
}

module.exports = StudentsController;