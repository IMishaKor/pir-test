import { NavLink } from 'react-router-dom';
import Box, { Item } from 'devextreme-react/box';

import logo from '../../logo.png';

const Navbar = () => {
  return (
    <Box className="header" direction="row" width="100%" align="space-between" crossAlign="center" height={40}>
      <Item ratio={1}>
        <NavLink className="header__brand" to="/">
          <img src={logo} alt="logo" />
          <span>OnlineNotes</span>
        </NavLink>
      </Item>
      <Item ratio={1}>
        <ul className="header__items">
          <li>Привет Пользователь!</li>
          <li>
            <NavLink to="/login">Войти</NavLink>
          </li>
          <li>
            <NavLink to="/registration">Регистрация</NavLink>
          </li>
        </ul>
      </Item>
    </Box>
  );
};

export default Navbar;
