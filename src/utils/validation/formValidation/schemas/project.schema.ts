import * as yup from 'yup';
import { validateZipcode } from '../../../../data/functions';

export interface RegisterFormProject {
  title: string;
  zipCode: string;
  cost: string;
  deadline: string;
}

const loginSchema = yup.object().shape({
  title: yup
    .string()
    .required("Requer título"),
  zipCode: yup.string().required("Requer CEP")
    .test("match", "Invalid Zip code", function (zip) {
      if (zip) {
        const zipCode = validateZipcode('BR', zip);
        if (!zipCode) {
          return this.createError({
            message: "Invalid zip code",
            path: "billingAddress.zip",
          });
        } else return true;
      }
      return false;
    }),
  cost: yup.number().min(0).required("Requer custo"),
  deadline: yup.string()
    .required("Requer data limite")
    .test((dateString: any) => new Date(dateString.replace(' ', '')).toString() !== 'Invalid Date'),
});

export default loginSchema;
