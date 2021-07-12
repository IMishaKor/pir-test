import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box, { Item } from 'devextreme-react/box';
import Form, {
  ButtonItem,
  GroupItem,
  SimpleItem,
  Label,
  EmailRule,
  RequiredRule,
  CompareRule,
} from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { profileAPI } from '../../api/api';
import { useStore } from '../../store/AuthStore';
import { registrationFormData } from './data';

const passwordComparison = () => {
  return registrationFormData.password;
};

const Registration = () => {
  const authStore = useStore();

  const [formFetch, setFormFetch] = useState(false);
  const history = useHistory();
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setFormFetch(true);
    profileAPI
      .addUser(registrationFormData)
      .then((data) => {
        if (data.error) {
          notify(data.message, 'warning', 3000);
        } else {
          notify('Регистрация прошла успешно', 'success', 3000);
          history.push('/login');
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
            formData={registrationFormData}
            labelLocation="top"
            readOnly={false}
            showColonAfterLabel={true}
            validationGroup="customerData"
          >
            <GroupItem caption="Регистрация">
              <SimpleItem dataField="email" editorType="dxTextBox">
                <Label text="Адрес электронной почты" />
                <RequiredRule message="Как с тобой связаться?" />
                <EmailRule message="Email неверный" />
              </SimpleItem>
              <SimpleItem dataField="name" editorType="dxTextBox">
                <Label text="Имя" />
                <RequiredRule message="Как к тебе оброщаться?" />
              </SimpleItem>
              <SimpleItem dataField="password" editorType="dxTextBox" editorOptions={{ mode: 'password' }}>
                <Label text="Пароль" />
                <RequiredRule message="Введите пароль" />
              </SimpleItem>
              <SimpleItem dataField="passwordConfirm" editorType="dxTextBox" editorOptions={{ mode: 'password' }}>
                <Label text="Введите пароль ещё раз" />
                <RequiredRule message="Обязтельно введи пароль ещё раз!" />
                <CompareRule message="Пароли не совпадают" comparisonTarget={passwordComparison} />
              </SimpleItem>
            </GroupItem>

            <ButtonItem
              horizontalAlignment="left"
              buttonOptions={{
                text: 'Зарегистрироваться',
                type: 'success',
                useSubmitBehavior: true,
                disabled: formFetch,
              }}
            />
          </Form>
        </form>
      </Item>
    </Box>
  );
};

export default observer(Registration);
