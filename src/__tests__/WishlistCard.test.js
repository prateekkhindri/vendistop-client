// WishlistCard.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { WishlistCard } from "../components/WishlistCard/WishlistCard.js";

// Initialize the mock store
const mockStore = configureStore([]);
let store;

// Mock product props
const mockProduct = {
  _id: "1",
  image: "https://example.com/test.jpg",
  title: "Test Product",
  price: "100",
};

describe("WishlistCard component", () => {
  beforeEach(() => {
    // Initialize the store before each test
    store = mockStore({});
  });

  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishlistCard {...mockProduct} />
        </MemoryRouter>
      </Provider>
    );
  });

  test("displays correct product title and price", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishlistCard {...mockProduct} />
        </MemoryRouter>
      </Provider>
    );

    // Check the title and price
    const titleElement = screen.getByText(mockProduct.title);
    const priceElements = screen.getAllByText(`$${mockProduct.price}`);

    expect(titleElement).toBeInTheDocument();
    expect(priceElements).toHaveLength(2);
  });
});
