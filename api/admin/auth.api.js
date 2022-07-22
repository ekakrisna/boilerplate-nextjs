import { httpClient } from '../../helpers/http-request';

export const loginApi = async ({ email, password }) => {
  try {
    const response = await httpClient().post('/admin/login', {
      email,
      password,
    });
    const data = response.data;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerApi = async ({ email, name, password }) => {
  try {
    const response = await httpClient().post('admin/register', {
      email,
      password,
      name,
    });

    const data = response.data;

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
