import axios from 'axios';

export const formatedDate = (date: string) => {
  let formDate = date.split('T')[0].split('-');
  return formDate.reverse().join('/');
}

export const getZipCodeInfo = async (zipCode: number) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${ zipCode }/json/`)
    const { logradouro, uf } = response.data;
    return `${logradouro}/${uf}`;
  } catch (error: any) {
    console.log(error.response.body);
  }
};
