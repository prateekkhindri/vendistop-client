import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Login from "../pages/login-register/Login";
import * as actions from "../pages/login-register/loginRegisterAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function customRender(ui, { store, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe("Login", () => {
  let store;
  const autoAdminLogin = jest.fn();

  beforeEach(() => {
    // Mock the action creators
    jest
      .spyOn(actions, "autoAdminLogin")
      .mockImplementation(() => autoAdminLogin);
    // Set initial state of the mock store
    store = mockStore({
      adminUser: {
        user: {},
      },
    });
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it("renders the go home link", () => {
    customRender(<Login />, { store });
    const linkElement = screen.getByText(/Go Home/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders the LoginForm component", () => {
    customRender(<Login />, { store });
    const emailInput = screen.getByPlaceholderText(/example@gmail.com/i);
    expect(emailInput).toBeInTheDocument();
  });
});
