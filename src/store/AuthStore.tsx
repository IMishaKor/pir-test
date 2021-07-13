import React, { ReactNode } from 'react';
import { Md5 } from 'md5-typescript';
import { action, makeObservable, observable } from 'mobx';
import { authAPI } from '../api/api';
import { IAuthStore } from '../common/type';

export default class AuthStore implements IAuthStore {
  authUser = {
    userId: 0,
    email: '',
    name: '',
  };
  isAuth = false;
  isInit = false;
  sessionTabId = '';

  constructor() {
    makeObservable(this, {
      isAuth: observable,
      isInit: observable,
      init: action,
      authMe: action,
      authLogin: action,
      authLogout: action,
    });
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
    this.isInit = true;
  }

  async authMe(userId: Number) {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }

  async authLogin(email: string, password: string) {
    try {
      const authLoginData = await authAPI.authLogin(email, password);
      if (!authLoginData.error && authLoginData.data) {
        await this.authMe(authLoginData.data.userId);
      }
      return authLoginData;
    } catch (error) {
      return { error: true, message: error, data: null };
    }
  }

  authLogout() {
    authAPI.authLogout();
    this.authUser = { userId: 0, email: '', name: '' };
    this.isAuth = false;
  }
}

const StoreContext = React.createContext<IAuthStore | null>(null);

interface IStoreProvider {
  store: IAuthStore;
  children: ReactNode;
}
export const StoreProvider = ({ store, children }: IStoreProvider) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => React.useContext(StoreContext);
