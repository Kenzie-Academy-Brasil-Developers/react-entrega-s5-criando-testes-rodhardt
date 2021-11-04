import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Providers from "../../providers";

import Search from "../../components/Search";

describe("Search component", () => {
  test("Should be able to search for a CEP number", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    const buttonSearch = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputField, { target: { value: 80740000 } });
    fireEvent.click(buttonSearch);
  });

  test("Should throw error when input is invalid CEP number", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    const buttonSearch = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputField, { target: { value: 80740000 } });
    fireEvent.click(buttonSearch);
  });
});
