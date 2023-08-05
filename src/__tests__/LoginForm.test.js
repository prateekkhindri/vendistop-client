import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../components/login/LoginForm";

const mockStore = configureStore([]);

describe("LoginForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      adminUser: {
        user: {},
      },
    });
  });

  it("allows the user to fill out the form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    // Get elements
    const emailInput = screen.getByPlaceholderText(/example@gmail.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);

    // Fill the form and submit
    userEvent.type(emailInput, "test@gmail.com");
    userEvent.type(passwordInput, "testPassword");

    // Assert that the inputs can be filled
    expect(emailInput.value).toBe("test@gmail.com");
    expect(passwordInput.value).toBe("testPassword");
  });
});
