import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import LoginPage from '../index';
import { LoginAction } from '../../../../store/modules/auth/actions'
import shallow from "enzyme/build/shallow";

const props = {
  isAuthenticated: true,
};
const mockStore = configureStore([thunk]);
const store = mockStore({
  loginState: {
    isAuthenticated: true
  }
});
describe("Login Page", () => {
  const loginPage = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage {...props} />
      </MemoryRouter>
    </Provider>,
  );

  describe("when the user is authenticated", () => {
    test("should not render the login page", () => {
      // look into his in deep
      expect(loginPage.find("Connect(Login)").exists()).toBe(true);
    });
  });
  test("should render the title as `Login`", () => {
    expect(loginPage.find(".title").text()).toEqual("Login into your account");
  });
  test("should render the login button", () => {
    expect(loginPage.find('button').length).toBe(1);
  });
});


