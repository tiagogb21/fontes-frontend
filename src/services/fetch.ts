import axios, { AxiosRequestConfig } from "axios";

const DB_URL = 'http://localhost:8080';

// const headers = {
//   'Authorization': 'Bearer my-token',
//   'My-Custom-Header': 'foobar'
// };

export const createUser = async (
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

  try {
    const response = await axios({
      method: 'post',
      url: `${DB_URL}/users`,
      data,
    });
    return response.data;
  } catch (error) {
    return error;
  }
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
  }).then(response => response.data)
    .catch(error => error);
}

export const axiosCreateProject = async (username: string, token: string, data: any) => {
  return await axios.post(`${ DB_URL }/project`,
  {
    ...data,
    zip_code: +data.zipCode.replace('-', ''),
    username,
  },
  {
    headers: {
      'token': token,
      username,
    }
  }).then(response => {
    return response.data
  }
  )
  .catch(error => error);
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
  return await axios.put(`${ DB_URL }/projects/${id}`,
  {
    ...data,
    deadline: data.deadline.replace(' ', '')
  },
  {
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
}

export const axiosDeleteProjects = async (username: string, id: string, token: string) => {
  return await axios.delete(`${ DB_URL }/project/${id}`, {
    headers: {
      'token': token,
      username,
    }
  })
}
