import { Md5 } from 'md5-typescript';
import { makeAutoObservable } from 'mobx';
import { authAPI } from '../api/api';
import { AuthInterface, resultUser } from '../common/type';

class Auth implements AuthInterface {
  authUser = {
    userId: null,
    email: '',
    name: '',
  };
  isAuth = false;
  sessionTabId: string | null = null;

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
    await authAPI.authMe(userId);
    this.isAuth = true;
  }

  async authLogin(email: string, password: string) {
    const authLoginData = await authAPI.authLogin(email, password);
    let result;
    if (!authLoginData.error && authLoginData.data) {
      await this.authMe(authLoginData.data.userId);
    }
    return authLoginData;
  }

  authLogout() {
    authAPI.authLogout();
    this.authUser = { userId: null, email: '', name: '' };
    this.isAuth = false;
  }
}

export default new Auth();
