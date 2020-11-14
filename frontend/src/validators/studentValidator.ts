import StringHelper from '../helpers/string';

const cpfWithRepeatedNumbers = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
];

const checkCpf = (cpf: string): boolean => {
  let sum = 0;
  let remainder: number;

  if (cpfWithRepeatedNumbers.indexOf(cpf) !== -1) return false;

  for (let i = 1; i <= 9; i += 1) {
    const multiplication = parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    sum += multiplication;
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i += 1) {
    const multiplication = parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    sum += multiplication;
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cpf.substring(10, 11), 10)) return false;
  return true;
};

interface StudentValidator {
  nameRules: ((value: string) => true | number)[];
  emailRules: ((value: string) => true | number)[];
  raRules: ((value: string) => true | number)[];
  cpfRules: ((value: string) => true | number)[];
}

export default {
  nameRules: [
    (v) => !!v || 'Nome é obrigatório',
    (v) => (v && v.length <= 100) || 'Máximo de 100 caracteres',
  ],
  emailRules: [
    (value) => !!value || 'E-mail é obrigatório',
    (value) => (value && value.length <= 75) || 'Máximo de 75 caracteres',
    (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'E-mail inválido';
    },
  ],
  raRules: [
    (value) => !!value || 'Registro acadêmico é obrigatório',
    (value) => {
      const pattern = /^\d+$/;
      return pattern.test(value) || 'O Resgistro acadêmico precisa conter apenas números';
    },
  ],
  cpfRules: [
    (value) => !!value || 'CPF é obrigatório',
    (value) => {
      const cpf = value ? StringHelper.onlyNumbers(value) : '';
      return checkCpf(cpf) || 'CPF inválido';
    },
  ],
} as StudentValidator;
