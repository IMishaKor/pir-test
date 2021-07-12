import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, EmailRule, RequiredRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { useStore } from '../../store/AuthStore';

import { authFormData } from './data';

const Login = () => {
  const authStore = useStore();

  const [formFetch, setFormFetch] = useState(false);
  const history = useHistory();
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setFormFetch(true);
    authStore
      ?.authLogin(authFormData.Email, authFormData.Password)
      .then((data) => {
        if (data.error) {
          notify(data.message, 'error', 3000);
        } else {
          authFormData.Email = '';
          authFormData.Password = '';
          history.push('/notes');
        }
        setFormFetch(false);
      })
      .catch((error) => {
        notify(error, 'error', 3000);
        setFormFetch(false);
      });
  };

  if (authStore?.isAuth) return <Redirect to="/" />;
  return (
    <Box direction="row" width="100%" align="center" crossAlign="center">
      <Item ratio={0} baseSize={400}>
        <form action="your-action" onSubmit={handleSubmit}>
          <Form
            formData={authFormData}
            labelLocation="top"
            readOnly={false}
            showColonAfterLabel={true}
            validationGroup="customerData"
          >
            <GroupItem caption="Авторизация">
              <SimpleItem dataField="Email" editorType="dxTextBox">
                <Label text="Адрес электронной почты" />
                <RequiredRule message="Email обязателен для заполнения" />
                <EmailRule message="Email неверный" />
              </SimpleItem>
              <SimpleItem dataField="Password" editorType="dxTextBox" editorOptions={{ mode: 'password' }}>
                <Label text="Пароль" />
                <RequiredRule message="Введите пароль" />
              </SimpleItem>
            </GroupItem>

            <ButtonItem
              horizontalAlignment="left"
              buttonOptions={{ text: 'Войти', type: 'success', useSubmitBehavior: true, disabled: formFetch }}
            />
          </Form>
        </form>
      </Item>
    </Box>
  );
};

export default observer(Login);
