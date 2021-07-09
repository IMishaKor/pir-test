import { Md5 } from 'md5-typescript';
import { resultUser, user, addUserProps } from '../common/type';
import { fakeFetch } from './function.inc';

export const authAPI = {
  async authMe(userId: Number): Promise<resultUser> {
    const response = await fakeFetch<resultUser>(() => {
      const result: resultUser = { error: false, message: '', data: null };

      const users: Array<user> = JSON.parse(localStorage.getItem('users') || '[]');
      const findUser = users.find((u) => u.userId === userId);
      if (findUser) {
        result.data = findUser;
        localStorage.setItem('AUTH_USER_ID', findUser.userId + '');
      } else {
        result.error = true;
      }

      return result;
    });
    return response;
  },

  async authLogin(email: string, password: string): Promise<resultUser> {
    const response = await fakeFetch<resultUser>(() => {
      const result: resultUser = { error: false, message: '', data: null };
      const users: Array<user> = JSON.parse(localStorage.getItem('users') || '[]');
      const findUser = users.find((u) => u.email === email && u.password === Md5.init(password));
      if (findUser) {
        result.data = findUser;
      } else {
        result.error = false;
        result.message = 'Email или пароль введины не правильно.';
      }
      return result;
    });
    return response;
  },

  async authLogout(): Promise<resultUser> {
    const response = await fakeFetch<resultUser>(() => {
      const result: resultUser = { error: false, message: '', data: null };
      localStorage.removeItem('AUTH_USER_ID');
      return result;
    });
    return response;
  },
};

export const profileAPI = {
  async addUser(data: addUserProps): Promise<resultUser> {
    const response = await fakeFetch<resultUser>(() => {
      const result: resultUser = { error: false, message: '', data: null };
      const users: Array<user> = JSON.parse(localStorage.getItem('users') || '[]');
      if (!users.find((u) => u.email === data.email)) {
        users.push({
          userId: new Date().getTime(),
          email: data.email,
          name: data.name,
          password: Md5.init(data.password),
        });
        localStorage.setItem('users', JSON.stringify(users));
      } else {
        result.error = true;
        result.message = 'Что-то пошло не так.';
      }
      return result;
    });
    return response;
  },
};
