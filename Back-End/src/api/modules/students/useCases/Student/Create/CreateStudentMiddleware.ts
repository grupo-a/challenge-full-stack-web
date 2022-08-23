import { Request, Response, NextFunction } from 'express';

export default class CreateStudentMiddleware {

  static nameValidate(req: Request, res: Response, next: NextFunction): Response | void {

    const { name } = req.body;

    if (name === '' || !name) {
      return res.status(400).json({ message: 'You must provide a name'});
    }
    next();
  }

  static emailValidate(req: Request, res: Response, next: NextFunction): Response | void {

    const { email } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;

    if (email === '' || !email) {
      return res.status(400).json({ message: 'You must provide an email'});
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Incorrect email format'});
    }
    next();
  }

  static raValidate(req: Request, res: Response, next: NextFunction): Response | void {

    const { ra } = req.body;

    if (ra === '' || !ra) {
      return res.status(400).json({ message: 'You must provide a ra'});
    }
    if (ra.length !== 6) {
      return res.status(400).json({ message: 'Your Ra must have 6 characters'});
    }
    next();
  }

  static raValidateParams(req: Request, res: Response, next: NextFunction): Response | void {

    const { ra } = req.params;

    if (ra === '' || !ra) {
      return res.status(400).json({ message: 'You must provide a ra in params'});
    }
    if (ra.length !== 6) {
      return res.status(400).json({ message: 'Your Ra must have 6 characters'});
    }
    next();
  }
  

  static cpfValidate(req: Request, res: Response, next: NextFunction): Response | void {

    const { cpf } = req.body;

    if (cpf === '' || !cpf) {
      return res.status(400).json({ message: 'You must provide a cpf'});
    }
    if (cpf.length !== 11) {
      return res.status(400).json({ message: 'Your cpf must have 11 characters'});
    }
    next();
  }
}