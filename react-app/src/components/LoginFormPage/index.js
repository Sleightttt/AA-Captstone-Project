import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";
import * as sessionActions from "../../store/session";
import { signUp } from "../../store/session";

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (password.length < 6) {
      newErrors["password"] =
        "Please enter a password longer than 6 characters";
    }

    if (username.length < 4) {
      newErrors["username"] =
        "Please enter a password longer than 4 characters";
    }
    if (email.length < 4 || !email.includes("@")) {
      newErrors["username"] = "Please enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }

    const data = await dispatch(signUp(username, email, password));

    if (data) {
      setErrors(data);
    }
  };

  const thisOrThat = signIn ? "loginnn" : "signinnn";

  const sign = (e) => {
    e.preventDefault();
    setErrors("");
    setUsername("");
    setPassword("");
    setEmail("");
    setSignIn(!signIn);
  };

  let loginSignIn = signIn
    ? "Sign up A New Account"
    : "Log In With Existing Account";

  let loginCreate = signIn ? "Create Account" : "Sign Up";

  return (
    <>
      <div className="login-container">
        <div className={thisOrThat}>
          {signIn ? (
            <form className="login-formmm login-form " onSubmit={handleSubmit}>
              <ul className="errorzz">
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
                Log In
              </button>
              <button onClick={sign} className="signup-button">
                {loginSignIn}
              </button>
              <button onClick={demoHandler} className="demo">
                Demo User
              </button>
            </form>
          ) : (
            <form className="signup-formmm login-form" onSubmit={handleSignUp}>
              <ul className="errorz">
                {errors.length ? (
                  Object.values(errors).map((error, idx) => (
                    <li className="errorzz" key={idx}>
                      {error.split(":")[1]}
                    </li>
                  ))
                ) : (
                  <div></div>
                )}
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
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                {loginCreate}
              </button>
              <button onClick={sign} className="signup-button">
                {loginSignIn}
              </button>
              <button onClick={demoHandler} className="demo">
                Demo User
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
