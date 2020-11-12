import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'é inválido',
    required: 'é um campo obrigatório',
  },
  string: {
    length: 'deve ter exatamente ${length} caracteres',
    min: 'deve ter pelo menos ${min} caracteres',
    max: 'deve ter no máximo ${max} caracteres',
    email: 'tem o formato de e-mail inválido',
    trim: 'não deve conter espaços no início ou no fim.',
  },
});

export default yup;
