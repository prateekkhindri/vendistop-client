import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { CartItem } from "../components/CartItem/CartItem.js";

// mock redux store
const store = configureStore({
  reducer: () => ({ cart: [] }),
});

// mock product data
const mockProduct = {
  _id: "1",
  title: "Test Product",
  price: 100,
  image: "https://example.com/image.jpg",
  amount: 1,
};

describe("CartItem component", () => {
  test("displays correct product title, price and amount", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CartItem {...mockProduct} />
        </MemoryRouter>
      </Provider>
    );

    // Check the title, price and amount
    const titleElement = screen.getByText(mockProduct.title);
    const amountElement = screen.getByText(mockProduct.amount.toString());

    expect(titleElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();

    // Check the price exists in the component
    const expectedPrice = `${(mockProduct.price * mockProduct.amount).toFixed(
      0
    )}`;
    expect(container.textContent).toContain(expectedPrice);
  });
});
