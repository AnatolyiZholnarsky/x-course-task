import "./specific-book.css";
import logo from "../assets/img/shopping-cart.png";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import logo2 from "../assets/img/avatar2.png";
import { BookContext, SelectedBooksContext } from "../context/BookContext";
import { useContext } from "react";

export default function Specificbook() {
  const [book, setBook] = useState(null);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const bookId = useParams().bookId;
  const [, setLoggedIn] = useState(false);
  const username = localStorage.getItem("username");
  const defaultImage = "https://via.placeholder.com/150";

  const books = useContext(BookContext);
  const { selectedBooks, setSelectedBooks } =
    useContext(SelectedBooksContext) || {};

  useEffect(() => {
    if (books) {
      const foundBook = books.find((book) => book.id === +bookId);
      setBook(foundBook);
    }
  }, [bookId, books]);

  const handleSignIn = (event) => {
    event.preventDefault();
    localStorage.removeItem("username", username);
    setLoggedIn(true);
    navigate("/");
  };
  const handleAddToCart = () => {
    const cartItem = {
      book: book,
      count: count,
    };
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    localStorage.setItem(
      "cartItems",
      JSON.stringify([...(cartItems || []), cartItem])
    );
    setSelectedBooks([...selectedBooks, cartItem]);
    navigate(`/cart`);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div class="container_specif">
        <header class="header">
          <div class="title">
            <h1> JC BAND STORE/Specific book </h1>
          </div>
          <div class="control">
            <div class="control__item control__cart">
              <Link to="/cart" className="control__item control__cart">
                <img src={logo} width="60" height="60" alt="shopping-cart" />
              </Link>
            </div>
            <div class="control__item">
              <button
                className="control__button_1"
                type="submit"
                onClick={handleSignIn}
              >
                Sign-Out
              </button>
            </div>
            <div class="control__item control__profile">
              <div class="control__ava">
                <img src={logo2} width="40" height="40" alt="Avatar " />
              </div>
              <div class="control__name">{username}</div>
            </div>
          </div>
        </header>
        <div class="main_specif">
          <div class="book">
            <div class="book__image">
              {" "}
              <img src={book.image || defaultImage} alt={book.title} />
            </div>
            <div class="book__info">
              <p class="book__name"> {book.title}</p>
              <p class="book__author"> {book.author} </p>
              <p class="book__tags">{book.shortDescription}</p>
            </div>

            <div class="cart__wrapper">
              <div class="cart">
                <div class="cart__item">
                  <div>Price,$</div>
                  <div id="price_item">{book.price}</div>
                </div>
                <div class="cart__item">
                  <div>Count</div>
                  <input
                    type="number"
                    id="tentacles"
                    name="tentacles"
                    min="1"
                    max="42"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  ></input>
                </div>
                <div class="cart__item">
                  <div>Total price</div>
                  <div id="total_price">{book.price * count}</div>
                </div>
                <div class="cart__item">
                  <div></div>
                  <button
                    className="button_add_to_cart "
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="book__description"> {book.description} </div>
        </div>
      </div>
    </>
  );
}
