import * as yup from 'yup';
import { ILogin } from '../../../interfaces/login.interface';
import { IRegister } from '../../../interfaces/register.interface';

import register from './schemas/register.schema';

const listSchemas = {
  register,
};

export type FormName = keyof typeof listSchemas;

export type FormValues = IRegister | ILogin;

const testSchema = async (
  schema: FormName,
  value: FormValues
): Promise<true | yup.ValidationError[]> => {
  try {
    const formSchema = listSchemas[schema];
    await formSchema.validate(value, { abortEarly: false });
    return true;
  } catch (err: any) {
    return err.inner;
  }
}

export default testSchema;
