import "./book-list.css";
import logo from "../assets/img/shopping-cart.png";
import { useState, useContext } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import logo2 from "../assets/img/avatar2.png";
import { BookContext } from "../context/BookContext";

export default function Booklist() {
  const books = useContext(BookContext);
  const navigate = useNavigate();
  const [, setLoggedIn] = useState(false);

  const [titleFilter, setTitleFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const username = localStorage.getItem("username");
  const defaultImage = "https://via.placeholder.com/150";

  const handleSignIn = (event) => {
    event.preventDefault();
    localStorage.removeItem("username", username);
    setLoggedIn(true);
    navigate("/");
  };
  function truncateTitle(title) {
    return title.length > 24 ? title.slice(0, 24) + "..." : title;
  }

  const filteredBooks = books?.filter((book) => {
    let isIncluded = true;
    if (
      titleFilter &&
      !book.title.toLowerCase().includes(titleFilter.toLowerCase())
    ) {
      isIncluded = false;
    }
    if (priceFilter === "low" && (book.price <= 0 || book.price > 15)) {
      isIncluded = false;
    }
    if (priceFilter === "mid" && (book.price <= 15 || book.price > 30)) {
      isIncluded = false;
    }
    if (priceFilter === "high" && book.price <= 30) {
      isIncluded = false;
    }
    return isIncluded;
  });

  return (
    <div class="container_booklist">
      <header class="header">
        <div class="title">
          <h1>JC BAND STORE/Book list</h1>
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
      <div class="main_list">
        <h1 className="list_book">List of books</h1>
        <div class="filters">
          <input
            className="filter_book_name"
            type="text"
            placeholder="Search by book name"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
          <select
            className="filter_price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="low">0-15</option>
            <option value="mid">15-30</option>
            <option value="high">30+</option>
          </select>
        </div>
        <div class="book_list">
          {filteredBooks &&
            filteredBooks.map((book) => (
              <div className="book__item" key={book.id}>
                <h2>{truncateTitle(book.title)}</h2>
                <p>{book.author}</p>
                <p>{book.price}</p>
                <img src={book.image || defaultImage} alt={book.title} />
                <p>{book.shortDescription}</p>
                <p>{book.description}</p>
                <button className="control__button">
                  <NavLink to={`/book/${book.id}`}>View</NavLink>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
