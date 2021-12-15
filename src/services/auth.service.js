import axios from 'axios';
import authHeader from './auth-header';

const API_AUTH_URL = 'http://localhost:8000/v1/auth';

const register = ({ email, password }) => {
  return axios.post(API_AUTH_URL + '/register', {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_AUTH_URL + '/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }

      return response.data;
    });
};

const me = () => {
  return axios
    .get(API_AUTH_URL + '/me', {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
};

const _delete = () => {
  return axios.delete(API_AUTH_URL + '/me', {
    headers: authHeader(),
  });
};

const changePassword = (newPassword) => {
  return axios.post(
    API_AUTH_URL + '/password',
    { password: newPassword },
    {
      headers: authHeader(),
    },
  );
};

const resetPassword = (data) => {
  return axios.post(
      API_AUTH_URL + '/password/reset',
      data,
  );
};

const authService = {
  register,
  login,
  me,
  logout,
  delete: _delete,
  changePassword,
  resetPassword,
};

export default authService;
