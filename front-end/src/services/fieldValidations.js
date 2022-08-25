// nameRules: [
//   v => /^[a-zA-Z ]+$/.test(v) ? true : 'Nome deve conter apenas letras',
//   v => !v ? 'Nome é obrigatório' : true,
// ],
// emailRules: [
//   v => !!v || 'E-mail é obrigatório',
//   v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
// ],
// raRules: [
//   v => /^\d+$/.test(v) || 'RA deve conter apenas números',
//   v => !!v || 'RA é obrigatório',
//   v => (v && v.length === 6) || 'RA deve ter 6 caracteres',
//   // checar se o ra ja existe
// ],
// cpfRules: [
//   v => /^\d+$/.test(v) || 'CPF deve conter apenas números',
//   v => !!v || 'CPF é obrigatório',
//   v => (v && v.length === 11) || 'CPF deve ter 11 caracteres',
// ],