import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, EmailRule, RequiredRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { useStore } from '../../store/AuthStore';

import { authFormData } from './data';
import LoginForm from './LoginForm';

const Login = () => {
  const authStore = useStore();

  if (authStore?.isAuth) return <Redirect to="/" />;
  return (
    <Box direction="row" width="100%" align="center" crossAlign="center" className="asdasd">
      <Item ratio={0} baseSize={400}>
        <LoginForm />
      </Item>
    </Box>
  );
};

export default observer(Login);
