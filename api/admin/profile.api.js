import { httpClient } from '../../helpers/http-request';

export const getUserProfileApi = async () => {
  try {
    const response = await httpClient().get('/admin/admin');
    const data = response.data.user;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
