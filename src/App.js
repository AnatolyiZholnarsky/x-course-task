import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Signin from "./components/Signin";
import Booklist from "./components/Book-list";
import Specificbook from "./components/Specific-book";
import NotFoundPage from "./components/NotFoundPage";
import "./App.css";
import Cart from "./components/Cart";
import { WithAuthRedirect } from "./components/WithAuthRedirect";
import { BookContext, SelectedBooksContext } from "./context/BookContext";
import booksData from "./misc/books.json";
import { useState } from "react";

function App() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  return (
    <BookContext.Provider value={booksData.books}>
      <SelectedBooksContext.Provider
        value={{ selectedBooks, setSelectedBooks }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Signin />} />
            <Route
              path="Booklist"
              element={
                <WithAuthRedirect>
                  <Booklist />
                </WithAuthRedirect>
              }
            />
            <Route
              path="book/:bookId"
              element={
                <WithAuthRedirect>
                  <Specificbook />
                </WithAuthRedirect>
              }
            />
            <Route
              path="Cart"
              element={
                <WithAuthRedirect>
                  <Cart />
                </WithAuthRedirect>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SelectedBooksContext.Provider>
    </BookContext.Provider>
  );
}
export default App;
