import { Request, Response, NextFunction } from 'express';


export function validateStudent() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { name, cpf, email } = req.body;

    if (!name || !cpf || !email) {
      return res.status(400).json({ error: 'Invalid schema' });
    }

    if (typeof name !== 'string' || typeof cpf !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid schema data types' });
    }

    if (name.length < 1 || name.length > 255) {
      return res.status(400).json({ error: 'Name must be between 1 and 255 characters' });
    }

    if (!/^\d+$/.test(cpf) || cpf.length !== 11) {
      return res.status(400).json({ error: 'CPF must be a string of 11 digits' });
    }

    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    next();
  };
}

