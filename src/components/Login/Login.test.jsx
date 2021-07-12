import React from 'react';
import { create, act } from 'react-test-renderer';

import Login from './Login';

jest.mock('../../../node_modules/devextreme-react/box');
jest.mock('../../../node_modules/devextreme-react/form');

describe('<Login/> ', () => {
  test('render', async () => {
    let component;
    await act(async () => {
      component = create(<Login />);
    });

    let tree = component.toJSON();
    console.log(component.getInstance());
    expect(tree).toMatchSnapshot();

    // await act(async () => {
    //   render(<Login />);
    // });
    // userEvent.type(screen.getByRole('textbox', { name: 'Password' }), 'couac');
    // let el = document.getElementById('div');
    // let sb = Form.getInstance(el);
    // console.log(el.innerHTML);
    // const { container } = render(<Login />);
    // console.log(container.getInstance());
    // const { container } = render(<Login />);
    // expect(container.innerHTML).toBeDefined();
    // expect(container.firstChild.classList.contains('header__items')).toBe(true);
  });
});
