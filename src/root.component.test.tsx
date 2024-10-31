import { render, screen } from "@testing-library/react";
import Root from "./root.component";

test("deve renderizar o título", () => {
  render(<Root />);
  const titleElement = screen.getByText(/Jogo do Desenhista Impostor/i);
  expect(titleElement).toBeInTheDocument();
});
