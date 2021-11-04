import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import Providers from "../../providers";

import App from "../../App.tsx";

import api from "../../services/";
import MockAdapter from "axios-mock-adapter";

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

  test("API MOCK: Should be able to search for CEP 88040000", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("80740000").replyOnce(200, {
      bairro: "Seminário",
      cidade: "Curitiba",
      logradouro: "Rua General Mário Tourinho",
      estado_info: {
        area_km2: "199.307,985",
        codigo_ibge: "41",
        nome: "Paraná",
      },
      cep: "80740000",
      cidade_info: {
        area_km2: "435,036",
        codigo_ibge: "4106902",
      },
      estado: "PR",
    });
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
      expect(
        screen.getByDisplayValue("Rua General Mário Tourinho")
      ).toBeInTheDocument();
    });
  });
});
