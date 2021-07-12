import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, screen, render } from '@testing-library/react';

import AuthStore, { StoreProvider } from '../../store/AuthStore';

import NavbarItems from './NavbarItems';

afterEach(cleanup);

describe('<NavbarItems/> ', () => {
  test('render', () => {
    const { container } = render(<NavbarItems />, { wrapper: MemoryRouter });
    expect(container.innerHTML).toBeDefined();
    const firstEl = container.firstChild as HTMLElement;
    expect(firstEl.classList.contains('header__items')).toBe(true);
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
    authStore.isAuth = true;
    authStore.authUser = { userId: 1, email: 'mr.kmv@bk.ru', name: 'Михаил' };
    test('Приветсвие"', () => {
      render(
        <StoreProvider store={authStore}>
          <NavbarItems />
        </StoreProvider>,
        { wrapper: MemoryRouter }
      );
      expect(screen.getByText(/Привет/i)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(authStore.authUser.name, 'i'))).toBeInTheDocument();
    });
    test('Ссылка "Выйти"', () => {
      render(
        <StoreProvider store={authStore}>
          <NavbarItems />
        </StoreProvider>,
        { wrapper: MemoryRouter }
      );
      expect(screen.getByText(/Выйти/i)).toBeInTheDocument();
    });
  });
});
