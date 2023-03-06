import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import logo from "../assets/img/avatar.png";

export default function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const isUsernameValid = username.length >= 4 && username.length <= 16;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    localStorage.setItem("username", username);
    setLoggedIn(true);
    navigate("/Booklist");
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <>
      <div className="container_signin">
        <header className="header">
          <div className="title">
            <h1> JC BAND STORE/Authorization </h1>
          </div>
        </header>
        <main className="main_container">
          <div className="control_image">
            <img className="image_item" src={logo} alt="Avatar UserName" />
          </div>

          <span className="span_item">{username}</span>

          <form onSubmit={handleSignIn}>
            <label>
              &nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;{" "}
              <input
                className="input_username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Input Username"
              />
            </label>
            <button
              className="control__button_2"
              type="submit"
              disabled={!isUsernameValid}
            >
              Sign-In
            </button>
          </form>
          {loggedIn && (
            <button className="control__button" onClick={handleSignOut}>
              Sign-Out
            </button>
          )}
        </main>
      </div>
    </>
  );
}
