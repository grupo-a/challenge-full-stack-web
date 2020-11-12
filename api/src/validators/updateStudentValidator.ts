import yup from './validator';

export default yup.object().shape({
  name: yup.string().required().max(100),
  email: yup.string().required().max(75).email(),
});
