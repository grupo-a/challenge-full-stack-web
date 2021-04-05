const StudentsRepository = require('../repositories/StudentsRepository');

const StudentsController = {
  store: async function(req, res, next) {
    try{
      const { body } = req;
      const student = await StudentsRepository.create(body);

      return res.status(201).json(student);
    } catch(err) {
      next(err);
    }
  },
  index: async function(req, res, next) {
    try{
      const students = await StudentsRepository.findAll();
      if (students.length > 0){
        return res.status(200).json(students);
      }
      return res.status(404).json({message: "No students found!"});
    } catch(err) {
      next(err);
    }
  },
  show: async function(req, res, next) {
    try{
      const { id } = req.params;

      const student = await StudentsRepository.findById(id);
      if(student) {
        return res.status(200).json(student);
      }
      return res.status(404).json({message: `No student found with id=${id}!`});
    } catch(err) {
      next(err);
    }
  },
  update: async function(req, res, next) {
    try{
      const { id } = req.params;
      const { body } = req;

      const student = await StudentsRepository.update(id, body);
      if (student) {
        return res.status(200).json(student);
      }
      return res.status(404).json({message: `No student found with id=${id}!`});
    } catch(err) {
      next(err);
    }
  },
  delete: async function (req, res, next) {
    try{
      const { id } = req.params;

      await StudentsRepository.delete(id);

      return res.status(200).json();
    } catch(err) {
      next(err);
    }
  }
}

module.exports = StudentsController;