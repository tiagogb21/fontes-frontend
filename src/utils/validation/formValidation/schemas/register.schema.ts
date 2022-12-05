import * as Yup from 'yup';

export interface RegisterForm {
  name: string;
  username: string;
  password: string;
}

const register = Yup.object().shape({
  name: Yup.string().required("Requer nome"),
  username: Yup.string().required("Requer nome de usuário"),
  password: Yup.string().required("Requer senha")
    .min(8, "A senha é muito curta. Requer mínimo de 8 caracteres")
})

export default register;
