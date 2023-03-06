import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App.js";
import Specificbook from "./components/Specific-book.js";

describe("Specificbook", () => {
  const book = {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    price: 10,
    shortDescription: "Short description",
    description: "Long description",
    image: "https://via.placeholder.com/150",
  };

  test("should increase the quantity when clicked on increase button", () => {
    render(
      <MemoryRouter initialEntries={["/book/1"]}>
        <Specificbook />
      </MemoryRouter>,
      { initialState: { books: [book], selectedBooks: [] } }
    );

    const increaseButton = screen.getByText(/Count/i).nextSibling.nextSibling;
    fireEvent.click(increaseButton);

    const countInput = screen.getByLabelText(/Count/i);
    expect(countInput.value).toBe("2");
  });

  test("should decrease the quantity when clicked on decrease button", () => {
    render(
      <MemoryRouter initialEntries={["/book/1"]}>
        <Specificbook />
      </MemoryRouter>,
      { initialState: { books: [book], selectedBooks: [] } }
    );

    const decreaseButton = screen.getByText(/Count/i).nextSibling;
    fireEvent.click(decreaseButton);

    const countInput = screen.getByLabelText(/Count/i);
    expect(countInput.value).toBe("1");
  });

  test("should update the total price when quantity changes", () => {
    render(
      <MemoryRouter initialEntries={["/book/1"]}>
        <Specificbook />
      </MemoryRouter>,
      { initialState: { books: [book], selectedBooks: [] } }
    );

    const increaseButton = screen.getByText(/Count/i).nextSibling.nextSibling;
    fireEvent.click(increaseButton);

    const totalPrice = screen.getByText(/Total price/i).nextSibling;
    expect(totalPrice.textContent).toBe("20");
  });
});
