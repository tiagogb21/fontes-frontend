import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Requer nome de usuário"),
  password: yup.string().required("Requer senha")
    .min(8, "A senha é muito curta. Requer mínimo de 8 caracteres")
});

export default loginSchema;
