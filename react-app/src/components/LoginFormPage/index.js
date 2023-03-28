import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, history, useHistory } from "react-router-dom";
import "./LoginForm.css";
import * as sessionActions from "../../store/session";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState("");

  if (sessionUser) return <Redirect to="/images" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  const demoHandler = () => {
    dispatch(sessionActions.login("demo@aa.io", "password")).then(
      history.push("/images")
    );
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          {signIn ? (
            <form className="login-formmm" onSubmit={handleSubmit}>
              <ul className="errorz">
                {errors.length ? (
                  <div>Error with credentials. Try again</div>
                ) : null}
              </ul>

              <input
                className="login-form-input"
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                className="login-form-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="login-button" type="submit">
                Sign In
              </button>
              <button className="signup-button">Sign Up</button>
            </form>
          ) : (
            <form className="login-formmm" onSubmit={handleSubmit}>
              <ul className="errorz">
                {errors.length ? (
                  <div>Error with credentials. Try again</div>
                ) : null}
              </ul>

              <input
                className="login-form-input"
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                className="login-form-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                className="login-form-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <button className="login-button" type="submit">
                Sign In
              </button>
              <button onClick={setSignIn(false)} className="signup-button">
                Sign Up
              </button>
            </form>
          )}
          <button onClick={demoHandler} className="demo">
            Demo User
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
