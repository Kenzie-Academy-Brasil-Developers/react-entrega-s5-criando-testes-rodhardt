import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Providers from "../../providers";

import Search from "../../components/Search";

describe("Input component from Search", () => {
  test("Should be able to render an input", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    expect(inputField).toBeTruthy();
  });

  test("Should be able to change input value with a number", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    fireEvent.change(inputField, { target: { value: 80740000 } });

    expect(inputField).toHaveValue(80740000);
  });

  test("Shouldn't be able to change input value with a string", () => {
    render(
      <Providers>
        <Search></Search>
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    fireEvent.change(inputField, { target: { value: "test" } });

    expect(inputField).not.toHaveValue("test");
  });
});
