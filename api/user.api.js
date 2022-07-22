import { httpClient } from '../helpers/http-request';

export const fetchUserApi = async ({ page, search }) => {
  try {
    const response = await httpClient().get('/user/account', {
      params: {
        page,
        search,
      },
    });
    const data = response.data;
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUserApi = async (payload) => {
  try {
    const { email, name, password } = payload;
    const response = await httpClient().post('/user/account/create', {
      email,
      name,
      password,
    });

    const data = response.data;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserApi = async (id) => {
  try {
    const response = await httpClient().get(`/user/account/${id}`);

    return Promise.resolve(response.data.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserApi = async (id, payload) => {
  try {
    const { name, email, password } = payload;

    const response = await httpClient().post(`/user/account/${id}/edit`, {
      name,
      email,
      password,
    });

    return Promise.resolve(response.data.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUserApi = async (id) => {
  try {
    const response = await httpClient().delete(`/user/account/${id}`);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
