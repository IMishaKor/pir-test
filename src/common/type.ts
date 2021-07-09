export type user = {
  userId: number;
  email: string;
  name: string;
  password: string;
};
export type resultUser = {
  error: boolean;
  message: string;
  data: user | null;
};
export type authUser = {
  userId: number | null;
  email: string;
  name: string;
};

export interface AuthInterface {
  authUser: authUser;
  sessionTabId: string | null;
  isAuth: boolean;
  init(): void;
  authLogout(): void;
  authMe(userId: number): void;
  authLogin(email: string, password: string): Promise<resultUser>;
}

export type addUserProps = {
  email: string;
  name: string;
  password: string;
};
