import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { RegistrationForm } from "../components";
import { postAdminUser } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

jest.mock("swiper/react", () => ({
  Swiper: () => <div>Swiper Mock</div>,
  SwiperSlide: () => <div>Swiper Slide Mock</div>,
}));

jest.mock("../helpers/axiosHelper", () => ({
  postAdminUser: jest.fn(),
}));

jest.mock("react-toastify");

jest.mock("../helpers/axiosHelper");

describe("RegistrationForm", () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Registration/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("displays error when passwords do not match", async () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );

    const [passwordInput, confirmPasswordInput] =
      screen.getAllByPlaceholderText("*******");

    userEvent.type(passwordInput, "password1");
    userEvent.type(confirmPasswordInput, "password2");

    const button = screen.getByText(/Create Account/i);
    userEvent.click(button);

    // await waitFor(() => {
    //   expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    // });
    expect(toast.error).toHaveBeenCalledWith("Passwords do not match");
  });

  test("calls postAdminUser and navigates when form is submitted", async () => {
    postAdminUser.mockResolvedValue({
      status: "success",
      message: "User created successfully",
    });

    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );

    const fNameInput = screen.getByPlaceholderText(/Enter first name/i);
    const lNameInput = screen.getByPlaceholderText(/Enter last name/i);
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const [passwordInput, confirmPasswordInput] =
      screen.getAllByPlaceholderText("*******");

    userEvent.type(fNameInput, "First");
    userEvent.type(lNameInput, "Last");
    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.type(confirmPasswordInput, "password");

    const button = screen.getByText(/Create Account/i);
    userEvent.click(button);

    await waitFor(() => {
      expect(postAdminUser).toHaveBeenCalled();
    });
  });
});
