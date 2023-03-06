import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header row">
      <h2>X-course task / Бутенко Анатолій</h2>
      <section className="title">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Signin</Link>
            </li>
            <li>
              {" "}
              <Link to="/Booklist">Book list</Link>
            </li>
            <li>
              {" "}
              <Link to="/Specificbook">Specific book</Link>{" "}
            </li>
            <li>
              <Link to="/Cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
