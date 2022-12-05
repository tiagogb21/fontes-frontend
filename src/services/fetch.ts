import axios, { AxiosRequestConfig } from "axios";

const DB_URL = 'http://localhost:8080';

// const headers = {
//   'Authorization': 'Bearer my-token',
//   'My-Custom-Header': 'foobar'
// };

export const createUser = (
  name: string,
  username: string,
  password: string,
  passwordConfirm: string,
) => {
  const data = {
    name,
    username,
    password,
    passwordConfirm,
  }

  return axios({
    method: 'post',
    url: `${ DB_URL }/users`,
    data,
  });
}

export const loginUser = (
  username: string,
  password: string,
) => {
  const data = {
    username,
    password,
  }

  return axios({
    method: 'post',
    url: `${ DB_URL }/login`,
    data,
  });
}

export const axiosGetProjects = async (username: string, token: string) => {
  return await axios.get(`${ DB_URL }/projects`, {
    headers: {
      'token': token,
      username,
    }
  })
}

export const axiosGetProjectById = (username: string, id: string) => {
  return axios({
    method: 'get',
    url: `${ DB_URL }/projects/${ id }`,
    config: {
      headers: {
        username
      }
    }
  } as AxiosRequestConfig);
}

export const axiosUpdateProject = async (username: string, id: string, token: string, data: any) => {
  console.log(data);
  return await axios.put(`${ DB_URL }/projects/${id}`, data, {
    headers: {
      'token': token,
      username,
    }
  })
}

export const axiosUpdateProjectsToDone = async (username: string, id: string, token: string) => {
  return await axios.patch(`${ DB_URL }/projects/${id}/done`, {}, {
    headers: {
      'token': token,
      username,
    }
  })
  // return await axios.patch(`${ DB_URL }/projects/${id}/done`, {
  //   options: {
  //     headers: {
  //       'token': token,
  //       username,
  //     }
  //   }
  // })
}

export const axiosDeleteProjects = async (username: string, id: string, token: string) => {
  return await axios.delete(`${ DB_URL }/project/${id}`, {
    headers: {
      'token': token,
      username,
    }
  })
}
