import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/images" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
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
          <div></div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
