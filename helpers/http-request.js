import axios from 'axios';
import jsCookie from 'js-cookie';

export const httpClient = (isContentJson = true) => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    timeout: 10000,
  });

  if (isContentJson) {
    instance.defaults.headers.common['Content-Type'] = 'application/json';
  }

  const accessToken = jsCookie.get('accessToken') || null;
  if (accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error?.response?.status === 401) {
        window.location.href = '/';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
