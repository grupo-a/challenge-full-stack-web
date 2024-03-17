import { Request, Response, Router } from 'express';

import { StudentService } from '../services/StudentService';
import LoggerService from '../services/LoggerService';
import { Student } from '../domain/models/Student';
import RedisService from '../infra/redis/RedisService';
import MySQLConnection from '../infra/mysql/MySQLConnection';
import { validateStudent } from '../middleware/validateStudent';



const studentRouter = Router();
const loggerService = new LoggerService();
const mysqlDataBase = new MySQLConnection(loggerService);
const redisInMemoria = new RedisService(loggerService);
const studentService = new StudentService(mysqlDataBase, redisInMemoria, loggerService); 


studentRouter.post('/', validateStudent(), async (req: Request, res: Response) => {
  try {
    const student: Student = req.body;
    const studentCreated = await studentService.createStudent(student);
    res.status(201).json(studentCreated);
  } catch (error) {
    loggerService.logError(`Error retrieving students: ${error.message}`);
    res.status(500).send("Error retrieving students");
  }
});



studentRouter.get('/', async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    loggerService.logError(`Error retrieving students: ${error.message}`);
    res.status(500).send("Error retrieving students");
  }
});


studentRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    loggerService.logError(`Error retrieving student: ${error.message}`);
    res.status(500).send("Error retrieving student");
  }
});


studentRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await studentService.updateStudent(id, updatedData);
    res.status(200).json(result);
  } catch (error) {
    loggerService.logError(`Error updating student: ${error.message}`);
    res.status(500).json({ error: 'Error updating student' });
  }
});


studentRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentService.deleteStudent(id);
    res.status(200).json(result);
  } catch (error) {
    loggerService.logError(`Error deleting user: ${error.message}`);
    res.status(500).json({ error: 'Error deleting user' });
  }
});



export default studentRouter;

