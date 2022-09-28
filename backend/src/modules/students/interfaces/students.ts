import { StudantsInterface } from '../../../models/interfaces/studants.interface';

export type CreateStudents = Omit<StudantsInterface, 'id' | 'ra'>;
