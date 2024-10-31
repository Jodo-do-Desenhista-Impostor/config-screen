import { render, screen } from "@testing-library/react";
import Root from "./root.component";

test("deve renderizar o título Jogo do Impostor", () => {
  render(<Root />);
  const titleElement = screen.getByText(/Jogo do Impostor/i);
  expect(titleElement).toBeInTheDocument();
});
