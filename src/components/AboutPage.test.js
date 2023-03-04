import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // import jest-dom library

import AboutPage from "./AboutPage";

test("displays the heading 'Each time you visit, a random city of Australia will be displayed.'", () => {
  render(<AboutPage />);
  const heading = screen.getByText(/Each time you visit, a random city of Australia will be displayed./i);
  expect(heading).toBeInTheDocument();
});


test('displays the temperature from the API', async () => {
    render(<AboutPage />);
    const tempText = await screen.findByText(/Temperature:/);
    expect(tempText).toBeInTheDocument();
  });
