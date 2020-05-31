const { Student } = require('../models');

class StudentsController {
  static async findAll(req, res, next) {
    const students = await Student.findAll();
    res.status(200).send(students);
  }

  static async create(req, res, next) {
    try {
      const student = await Student.create(req.body);
      res.status(201).send(student);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'An error occurred on the server.' });
    }
  }
}

module.exports = StudentsController;
