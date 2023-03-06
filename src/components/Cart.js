import "./cart.css";
import logo from "../assets/img/shopping-cart.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import logo2 from "../assets/img/avatar2.png";
import { SelectedBooksContext } from "../context/BookContext";

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const username = localStorage.getItem("username");
  const { selectedBooks, setSelectedBooks } = useContext(SelectedBooksContext);

  const handleSignIn = (event) => {
    event.preventDefault();
    localStorage.removeItem("username", username);
    setLoggedIn(true);
    navigate("/");
  };

  const handlePurchase = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    navigate("/cart");
  };
  const isCartEmpty = cartItems.length === 0;
  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    // const itemsString = searchParams.get("item");
    // if (itemsString) {
    //   const items = JSON.parse(itemsString);
    //   setCartItems((prevItems) => [...prevItems, items]);
    // }
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, [location]);

  return (
    <>
      <div className="container_cart">
        <header className="header">
          <div className="title">
            <h1> JC BAND STORE/Cart </h1>
          </div>
          <div className="control">
            <div className="control__item control__cart">
              <Link to="/cart" className="control__item control__cart">
                <img src={logo} width="60" height="60" alt="shopping-cart" />
              </Link>
            </div>
            <div className="control__item">
              <button
                className="control__button_1"
                type="submit"
                onClick={handleSignIn}
              >
                Sign-Out
              </button>
            </div>
            <div className="control__item control__profile">
              <div className="control__ava">
                <img src={logo2} width="40" height="40" alt="Avatar " />
              </div>
              <div className="control__name">{username}</div>
            </div>
          </div>
        </header>
        <button
          className="cart__purchase"
          disabled={isCartEmpty}
          onClick={handlePurchase}
        >
          Purchase
        </button>
        <main>
          {cartItems.length === 0 ? (
            <div className="control_image">
              <img
                className="image_item_logo"
                src={logo}
                width="150"
                height="150"
                alt="Cart empty"
              />
              <p>
                <span className="cart_empty">Cart empty....</span>
              </p>
            </div>
          ) : (
            <div className="cart__wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    {/*  <th>Author</th>*/}
                    {/* <th>Price</th>*/}
                    <th>Count</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td st>{item.book.title}</td>
                      {/* <td>{item.book.author}</td>*/}
                      {/*   <td>{item.book.price}</td>*/}
                      <td>{item.count}</td>
                      <td>{item.book.price * item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart__total">
                <span className="total_price"> Total price $&nbsp;:&nbsp;</span>
                &ensp;&emsp;&emsp;&emsp;{" "}
                {cartItems.reduce(
                  (total, item) =>
                    +total.toFixed(2) + item.book.price * item.count,
                  0
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
