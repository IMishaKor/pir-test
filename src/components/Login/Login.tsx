import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, EmailRule, RequiredRule } from 'devextreme-react/form';
import { useState } from 'react';

const authFormData = {
  Email: 'mr.kmv@bk.ru',
  Password: '',
};

const Login = () => {
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log(authFormData);
  };
  return (
    <>
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
                  {/* <AsyncRule message="Email is already registered" validationCallback={asyncValidation} /> */}
                </SimpleItem>
                <SimpleItem dataField="Password" editorType="dxTextBox" editorOptions={{ mode: 'password' }}>
                  <Label text="Пароль" />
                  <RequiredRule message="Введите пароль" />
                </SimpleItem>
              </GroupItem>

              <ButtonItem
                horizontalAlignment="left"
                buttonOptions={{ text: 'Войти', type: 'success', useSubmitBehavior: true }}
              />
            </Form>
          </form>
        </Item>
      </Box>
    </>
  );
};

export default Login;
