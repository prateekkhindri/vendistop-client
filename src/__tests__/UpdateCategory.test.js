import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { UpdateCategory } from "../components/Dashboard/cat-form/UpdateCategory";
import * as actions from "../pages/categories/categoryAction.js";

const mockStore = configureStore([]);

describe("UpdateCategory", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      categoriesStore: {
        categories: [
          {
            _id: "1",
            name: "Test Category",
          },
        ],
      },
    });

    // Here we mock the action
    jest.spyOn(actions, "getCategoriesAction").mockReturnValue({
      type: "MOCK_GET_CATEGORIES",
    });
  });

  it("renders category and allows the user to edit the category name", () => {
    render(
      <Provider store={store}>
        <UpdateCategory
          handleDelete={() => {}}
          isEditMode={false}
          setIsEditMode={() => {}}
        />
      </Provider>
    );

    const nameInput = screen.getByDisplayValue("Test Category");

    expect(nameInput).toBeInTheDocument();
  });
});
