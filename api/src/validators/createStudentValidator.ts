import { getCustomRepository } from 'typeorm';
import yup from './validator';
import StudentRepository from '../repositories/studentRepository';
import { checkCpf } from '../helpers/cpf';

export default yup.object().shape({
  name: yup.string().required().max(100),
  cpf: yup
    .string()
    .required()
    .matches(/^\d+$/, 'o campo precisa conter apenas números')
    .min(11)
    .max(11)
    .test('cpf', 'cpf inválido', (value) => checkCpf(value || '')),
  email: yup.string().required().max(75).email(),
  ra: yup
    .string()
    .required()
    .matches(/^\d+$/, 'o campo precisa conter apenas números')
    .max(20)
    .test(
      'is-unique',
      'Já existe um aluno cadastrado com o RA informado',
      async (value) => {
        const repository = getCustomRepository(StudentRepository);
        const result = await repository.findOne({
          where: {
            ra: value,
          },
        });

        return !result;
      }
    ),
});
