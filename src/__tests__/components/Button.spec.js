import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Providers from "../../providers";

import Search from "../../components/Search";

describe("Input component from Search", () => {
  test("Should be able to render a button", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const buttonSearch = screen.getByText("Buscar pelo CEP");
    expect(buttonSearch).toBeTruthy();
  });

  test("Should be disabled by default", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const buttonSearch = screen.getByText("Buscar pelo CEP");
    expect(buttonSearch).toBeDisabled();
  });

  test("Shouldn't be disabled after input change", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const buttonSearch = screen.getByText("Buscar pelo CEP");
    const inputField = screen.getByPlaceholderText("Insira o CEP");

    fireEvent.change(inputField, { target: { value: 88040000 } });

    expect(buttonSearch).not.toBeDisabled();
  });
});
