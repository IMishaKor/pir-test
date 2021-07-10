import { Md5 } from 'md5-typescript';
import { makeAutoObservable } from 'mobx';
import { authAPI } from '../api/api';
import { AuthInterface } from '../common/type';

class Auth implements AuthInterface {
  authUser = {
    userId: 0,
    email: '',
    name: '',
  };
  isAuth = false;
  sessionTabId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    const userId = localStorage.getItem('AUTH_USER_ID');
    if (userId) {
      if (window.name) {
        this.sessionTabId = window.name;
      } else {
        this.sessionTabId = Md5.init(userId + '_' + Math.random());
        window.name = this.sessionTabId;
      }
      await this.authMe(+userId);
    }
  }

  async authMe(userId: Number) {
    const authMyData = await authAPI.authMe(userId);
    if (!authMyData.error && authMyData.data) {
      this.authUser.userId = authMyData.data.userId;
      this.authUser.name = authMyData.data.name;
      this.authUser.email = authMyData.data.email;
      this.isAuth = true;
    } else {
      this.authUser = { userId: 0, email: '', name: '' };
      this.isAuth = false;
    }
  }

  async authLogin(email: string, password: string) {
    const authLoginData = await authAPI.authLogin(email, password);
    if (!authLoginData.error && authLoginData.data) {
      await this.authMe(authLoginData.data.userId);
    }
    return authLoginData;
  }

  authLogout() {
    authAPI.authLogout();
    this.authUser = { userId: 0, email: '', name: '' };
    this.isAuth = false;
  }
}

export default new Auth();
