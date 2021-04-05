const StudentRepository = require('../repositories/StudentRepository');

const StudentController = {
  store: async function(req, res) {
    const { body } = req;
    const student = await StudentRepository.create(body);

    return res.status(201).json(student);
  },
  index: async function(req, res) {
    const students = await StudentRepository.findAll();
    return res.status(200).json(students);
  },
  show: async function(req, res) {
    const { id } = req.params;

    const student = await StudentRepository.findById(id);
    return res.status(200).json(student);
  },
  update: async function(req, res) {
    const { id } = req.params;
    const { body } = req;

    const student = await StudentRepository.update(id, body);
    return res.status(200).json(student);
  },
  delete: async function (req, res) {
    const { id } = req.params;

    await StudentRepository.delete(id);

    return res.status(200);
  }
}