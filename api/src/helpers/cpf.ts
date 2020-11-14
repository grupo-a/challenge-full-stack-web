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

export { checkCpf };
