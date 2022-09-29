import { StudantsInterface } from '../../../models/interfaces/studants.interface';

export type CreateStudents = Omit<StudantsInterface, 'id' | 'ra'>;

export type UpdateStudents = Omit<
  Partial<StudantsInterface>,
  'id' | 'ra' | 'cpf'
>;

export type ListStudents = StudantsInterface & {
  createdAt: Date;
  updatedAt: Date;
};
