import { NavLink } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { useStore } from '../../store/AuthStore';

const NavbarItems = () => {
  const authStore = useStore();
  return (
    <ul className="header__items">
      {authStore?.isAuth ? (
        <>
          <li>
            Привет <b>{authStore?.authUser.name}</b>!
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                authStore?.authLogout();
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
