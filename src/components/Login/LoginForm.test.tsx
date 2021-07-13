import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LoginForm from './LoginForm';
import AuthStore, { StoreProvider } from '../../store/AuthStore';
import { act } from 'react-dom/test-utils';

let container: HTMLElement | null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  container && document.body.removeChild(container);
  container = null;
});

describe('<LoginForm/> ', () => {
  const authStore = new AuthStore();
  authStore.isAuth = false;
  authStore.authUser = { userId: 1, email: 'mr.kmv@bk.ru', name: 'Михаил' };
  test('render', async () => {
    ReactDOM.render(
      <BrowserRouter>
        <StoreProvider store={authStore}>
          <LoginForm />
        </StoreProvider>
      </BrowserRouter>,
      container
    );
    expect(container?.querySelector('form')).not.toBeNull();
  });

  test('validate false', async () => {
    const { container } = render(<LoginForm />);

    const btnSubmit = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(btnSubmit);

    expect(container.querySelector('.dx-validator.dx-invalid')).not.toBeNull();
  });

  type user = {
    userId: number;
    email: string;
    name: string;
    password: string;
  };

  type resultUser = {
    error: boolean;
    message: string;
    data: user | null;
  };

  test('validate true, auth true', async () => {
    class TestAuthStore extends AuthStore {
      constructor() {
        super();
      }
      async authLogin(email: string, password: string) {
        this.isAuth = true;
        return { error: false, message: '', data: null };
      }
    }
    const testAuthStore = new TestAuthStore();
    const wraper = render(
      <BrowserRouter>
        <StoreProvider store={testAuthStore}>
          <LoginForm />
        </StoreProvider>
      </BrowserRouter>
    );
    // wraper.container

    expect(testAuthStore.isAuth).toBeFalsy();
    const email = screen.getByRole('textbox', { name: 'Адрес электронной почты: *' });
    fireEvent.change(email, { target: { value: 'mr.kmv@bk.ru' } });

    const password = screen.getByRole('textbox', { name: 'Пароль: *' });
    fireEvent.change(password, { target: { value: '123456' } });

    const btnSubmit = screen.getByRole('button', { name: 'Submit' });
    await act(async () => {
      fireEvent.click(btnSubmit);
    });
    expect(testAuthStore.isAuth).not.toBeFalsy();
  });

  test('Login fasle', async () => {
    class TestAuthStore extends AuthStore {
      constructor() {
        super();
      }

      async authLogin(email: string, password: string) {
        this.isAuth = false;
        return { error: true, message: 'Ошибочка вышла!', data: null };
      }
    }
    const testAuthStore = new TestAuthStore();
    render(
      <BrowserRouter>
        <StoreProvider store={testAuthStore}>
          <LoginForm />
        </StoreProvider>
      </BrowserRouter>
    );
    const email = screen.getByRole('textbox', { name: 'Адрес электронной почты: *' });
    fireEvent.change(email, { target: { value: 'mr.kmv@bk.ru' } });

    const password = screen.getByRole('textbox', { name: 'Пароль: *' });
    fireEvent.change(password, { target: { value: '123456' } });

    const btnSubmit = screen.getByRole('button', { name: 'Submit' });
    await act(async () => {
      fireEvent.click(btnSubmit);
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Ошибочка вышла!');
  });
});
