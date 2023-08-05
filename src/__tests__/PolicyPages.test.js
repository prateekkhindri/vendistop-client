import React from "react";
import { render, screen } from "@testing-library/react";
import Privacy from "../pages/Privacy/Privacy.js";
import TermsConditions from "../pages/Terms/Terms.js";
import { privacyPolicyData } from "../constants/privacyPolicyData";
import { termsConditionsData } from "../constants/termsConditionsData";
import { MemoryRouter } from "react-router-dom";

describe("Privacy component", () => {
  test("renders page title and correct number of Rules", () => {
    render(
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>
    );

    expect(screen.getByText("Privacy & Policy")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(
      privacyPolicyData.length
    );
  });
});

describe("TermsConditions component", () => {
  test("renders page title and correct number of Rules", () => {
    render(
      <MemoryRouter>
        <TermsConditions />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Terms & Conditions/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(
      termsConditionsData.length
    );
  });
});
