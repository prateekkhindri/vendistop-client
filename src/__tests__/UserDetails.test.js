import { render, screen } from "@testing-library/react";
import { UserDetails } from "../components/UserInfo/UserDetails/UserDetails.js";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe("UserDetails", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      adminUser: {
        user: {
          fName: "",
          lName: "",
          phone: "",
          email: "",
          street: "",
          suburb: "",
          state: "",
          postcode: "",
          currentPassword: "",
        },
      },
    });
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <UserDetails />
      </Provider>
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /Update Profile/i })
    ).toBeInTheDocument();
  });

  it("renders all required input fields", () => {
    render(
      <Provider store={store}>
        <UserDetails />
      </Provider>
    );
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mobile Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Street Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Suburb")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Postcode")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
});
