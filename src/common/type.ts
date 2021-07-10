export type resultDefault = {
  error: boolean;
  message: string;
};

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
  userId: number;
  email: string;
  name: string;
};

export type note = {
  noteId: number;
  userId: number;
  created: number;
  note: string;
  status: string;
  editNow: string;
};
export type resultNote = {
  error: boolean;
  message: string;
  data: note | null;
};
export type resultNotes = {
  error: boolean;
  message: string;
  data: note[] | null;
};

export type addNoteProps = {
  note: string;
  status: string;
};
export type editNoteProps = {
  noteId: number;
  note: string;
  status: string;
};

export interface AuthInterface {
  authUser: authUser;
  sessionTabId: string;
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

export interface useParamTypes {
  noteId: string;
}
