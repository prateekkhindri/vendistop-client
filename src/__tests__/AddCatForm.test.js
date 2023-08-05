import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { AddCatForm } from "../components/Dashboard/cat-form/AddCatForm";

const mockStore = configureStore([]);

describe("AddCatForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it("renders form and allows the user to fill out the form", () => {
    render(
      <Provider store={store}>
        <AddCatForm />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText(
      /Enter your category name.../i
    );

    userEvent.type(nameInput, "Test Category");

    expect(nameInput.value).toBe("Test Category");
  });
});
