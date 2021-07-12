import { NavLink } from 'react-router-dom';
import Box, { Item } from 'devextreme-react/box';
import NavbarItems from './NavbarItems';

import logo from '../../logo.png';

const Navbar = () => {
  return (
    <Box className="header" direction="row" width="100%" align="center" crossAlign="center" height={40}>
      <Item baseSize={300}>
        <NavLink className="header__brand" to="/">
          <img src={logo} alt="logo" />
          <span>OnlineNotes</span>
        </NavLink>
      </Item>
      <Item baseSize={400}>
        <NavbarItems />
      </Item>
    </Box>
  );
};

export default Navbar;
