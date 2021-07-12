import { Md5 } from 'md5-typescript';
import {
  resultDefault,
  resultUser,
  user,
  addUserProps,
  addNoteProps,
  editNoteProps,
  note,
  resultNote,
  resultNotes,
} from '../common/type';
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
        result.error = true;
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
        result.message = 'Пользователь с таким Email уже зарегистрирован.';
      }
      return result;
    });
    return response;
  },
};

export const notesAPI = {
  async addNote(data: addNoteProps): Promise<resultDefault> {
    const response = await fakeFetch<resultDefault>(() => {
      const result: resultDefault = { error: false, message: '' };
      const notes: Array<note> = JSON.parse(localStorage.getItem('notes') || '[]');
      const userId = localStorage.getItem('AUTH_USER_ID') || 0;

      const newNote: note = {
        noteId: Date.now(),
        userId: +userId,
        created: Date.now(),
        note: data.note,
        status: data.status,
        editNow: '',
      };
      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
      return result;
    });
    return response;
  },
  async editNote(data: editNoteProps): Promise<resultDefault> {
    const response = await fakeFetch<resultDefault>(() => {
      const result: resultDefault = { error: false, message: '' };
      const notes: Array<note> = JSON.parse(localStorage.getItem('notes') || '[]');

      notes.forEach((n, k) => {
        if (n.noteId === data.noteId) {
          n.note = data.note;
          n.status = data.status;
          n.editNow = '';
        }
      });
      localStorage.setItem('notes', JSON.stringify(notes));
      return result;
    });
    return response;
  },

  async getNote(noteId: number, sessionTabId: string): Promise<resultNote> {
    const response = await fakeFetch<resultNote>(() => {
      const result: resultNote = { error: false, message: '', data: null };
      const userId = localStorage.getItem('AUTH_USER_ID') || 0;
      const notes: Array<note> = JSON.parse(localStorage.getItem('notes') || '[]');

      result.data = notes.find((n) => n.userId === +userId && n.noteId === noteId) || null;

      if (result.data) {
        if (!result.data.editNow) {
          result.data.editNow = sessionTabId;
          notes.forEach((n, k) => {
            if (n.noteId === noteId) {
              n.editNow = sessionTabId;
            }
          });
          localStorage.setItem('notes', JSON.stringify(notes));
        }
      } else {
        result.error = true;
        result.message = 'Такой заметки не существует';
      }
      return result;
    });
    return response;
  },

  async getNotes(): Promise<resultNotes> {
    const response = await fakeFetch<resultNotes>(() => {
      const result: resultNotes = { error: false, message: '', data: null };
      const userId = localStorage.getItem('AUTH_USER_ID') || 0;
      const notes: Array<note> = JSON.parse(localStorage.getItem('notes') || '[]');
      result.data = notes.filter((n) => n.userId === +userId);
      return result;
    });
    return response;
  },

  async removeNote(noteId: number) {
    const response = await fakeFetch<resultDefault>(() => {
      const result: resultDefault = { error: false, message: '' };
      const notes: Array<note> = JSON.parse(localStorage.getItem('notes') || '[]');

      localStorage.setItem('notes', JSON.stringify(notes.filter((n) => n.noteId !== noteId)));

      return result;
    });
    return response;
  },
};
