import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

import Providers from "./providers";

describe("App rendered", () => {
  test("App test", () => {
    render(
      <Providers>
        <App />
      </Providers>
    );
  });
});
