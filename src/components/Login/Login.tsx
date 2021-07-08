import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, EmailRule, RequiredRule } from 'devextreme-react/form';

const customer = {
  Email: '',
  Password: '',
};
const Login = () => {
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log(123);
  };
  return (
    <>
      <Box direction="row" width="100%" align="center" crossAlign="center">
        <Item ratio={0} baseSize={400}>
          <form action="your-action" onSubmit={handleSubmit}>
            <Form
              formData={customer}
              labelLocation="top"
              readOnly={false}
              showColonAfterLabel={true}
              showValidationSummary={true}
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

              <ButtonItem horizontalAlignment="left" buttonOptions={{ text: 'Войти', type: 'success' }} />
            </Form>
          </form>
        </Item>
      </Box>
    </>
  );
};

export default Login;
