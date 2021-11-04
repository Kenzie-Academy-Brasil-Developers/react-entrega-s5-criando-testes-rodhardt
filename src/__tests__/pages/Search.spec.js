import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import Providers from "../../providers";

import App from "../../App.tsx";

describe("App testing", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  test("Should be able to search for a CEP number", async () => {
    render(
      <Providers>
        <App></App>
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    const buttonSearch = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputField, { target: { value: 80740000 } });
    fireEvent.click(buttonSearch);

    await waitFor(() => {
      const response = screen.getByDisplayValue("Rua General Mário Tourinho");
      expect(response).toBeTruthy();
    });
  });

  test("Should throw error when number doesn't have 8 digits", async () => {
    render(
      <Providers>
        <App></App>
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    const buttonSearch = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputField, { target: { value: 12345 } });
    fireEvent.click(buttonSearch);

    await waitFor(() => {
      const response = screen.getByText(
        "CEP inválido! São necessários 8 números"
      );
      expect(response).toBeTruthy();
    });
  });
});
