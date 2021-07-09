import { NavLink } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import Auth from '../../store/Auth';

const NavbarItems = () => {
  return (
    <ul className="header__items">
      {Auth.isAuth ? (
        <>
          <li>Привет Пользователь!</li>
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                Auth.authLogout();
              }}
            >
              Выйти
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Войти</NavLink>
          </li>
          <li>
            <NavLink to="/registration">Регистрация</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default observer(NavbarItems);
