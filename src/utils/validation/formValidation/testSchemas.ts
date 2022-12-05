import * as yup from 'yup';
import { ILogin } from '../../../interfaces/login.interface';
import { IProject } from '../../../interfaces/project.interface';
import { IRegister } from '../../../interfaces/register.interface';

import register from './schemas/register.schema';
import project from './schemas/project.schema';

const listSchemas = {
  register,
  project,
};

export type FormName = keyof typeof listSchemas;

export type FormValues = IRegister | ILogin | IProject | any;

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
