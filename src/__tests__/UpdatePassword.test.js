import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/login-register/loginRegisterSlice.js";
import { UpdatePassword } from "../components/UserInfo/EmailPassword/UpdatePassword.js";

describe("UpdatePassword", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        adminUser: loginReducer,
      },
      preloadedState: {
        adminUser: { user: { email: "test@example.com" } },
      },
    });
  });

  it('has the "Current Password" input', () => {
    render(
      <Provider store={store}>
        <UpdatePassword />
      </Provider>
    );
    expect(screen.getByTestId("current-password-input")).toBeInTheDocument();
  });

  it('has the "New Password" input', () => {
    render(
      <Provider store={store}>
        <UpdatePassword />
      </Provider>
    );
    expect(screen.getByTestId("new-password-input")).toBeInTheDocument();
  });

  it('has the "Confirm Password" input', () => {
    render(
      <Provider store={store}>
        <UpdatePassword />
      </Provider>
    );
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
  });
});
