import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import AuthStore, { StoreProvider } from '../../store/AuthStore';

let container: HTMLElement | null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  container && document.body.removeChild(container);
  container = null;
});

describe('<LoginForm/> ', () => {
  const authStore = new AuthStore();
  authStore.isAuth = false;
  authStore.authUser = { userId: 1, email: 'mr.kmv@bk.ru', name: 'Михаил' };
  test('render', async () => {
    ReactDOM.render(
      <BrowserRouter>
        <StoreProvider store={authStore}>
          <LoginForm />
        </StoreProvider>
      </BrowserRouter>,
      container
    );
    expect(container?.querySelector('form')).not.toBeNull();
  });
});
/*
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

test('enzyme dive', () => {
  const authStore = new AuthStore();
  authStore.isAuth = true;
  authStore.authUser = { userId: 1, email: 'mr.kmv@bk.ru', name: 'Михаил' };
  const wrapper = Enzyme.render(
    <BrowserRouter>
      <StoreProvider store={authStore}>
        <Login />
      </StoreProvider>
    </BrowserRouter>
  );
  console.log(wrapper.find(Login).html());
  expect(wrapper).toMatchSnapshot();
  // expect(element.find(Login).dive().html()).toBe('div');
});
*/
