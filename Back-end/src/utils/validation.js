const validationStudent = (ra, name, cpf, email) => {
  if (!ra) return { error: 400, message: 'ra field is required.' };

  if (!name) return { error: 400, message: 'name field is required.' };

  if (!email) return { error: 400, message: 'email field is required.' };

  if (!cpf) return { error: 400, message: 'cpf field is required.' };

  return true;
};

module.exports = validationStudent;
