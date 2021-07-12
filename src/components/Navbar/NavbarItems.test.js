// __tests__/CheckboxWithLabel-test.js
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, screen, render } from '@testing-library/react';

import AuthStore, { StoreProvider } from '../../store/AuthStore';

import NavbarItems from './NavbarItems';
import { debug } from 'console';

afterEach(cleanup);

describe('<NavbarItems/> ', () => {
  test('render', () => {
    const { container } = render(<NavbarItems />, { wrapper: MemoryRouter });
    expect(container.innerHTML).toBeDefined();
    expect(container.firstChild.classList.contains('header__items')).toBe(true);
  });
  describe('без авторизации', () => {
    test('Ссылка "войти"', () => {
      render(<NavbarItems />, { wrapper: MemoryRouter });
      expect(screen.getByText(/Войти/i)).toBeInTheDocument();
    });
    test('Ссылка "Регистрация"', () => {
      render(<NavbarItems />, { wrapper: MemoryRouter });
      expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    });
  });
  describe('с авторизацией', () => {
    const authStore = new AuthStore();
    AuthStore.isAuth = true;
    AuthStore.authUser = { userId: 1, email: 'mr.kmv@bk.ru', name: 'Михаил' };
    test('Приветсвие"', () => {
      render(
        <StoreProvider store={AuthStore}>
          <NavbarItems />
        </StoreProvider>,
        { wrapper: MemoryRouter }
      );
      expect(screen.getByText(/Привет/i)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(AuthStore.authUser.name, 'i'))).toBeInTheDocument();
    });
    test('Ссылка "Выйти"', () => {
      render(
        <StoreProvider store={AuthStore}>
          <NavbarItems />
        </StoreProvider>,
        { wrapper: MemoryRouter }
      );
      expect(screen.getByText(/Выйти/i)).toBeInTheDocument();
    });
  });
});
