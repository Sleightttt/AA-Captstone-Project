import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, history, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
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
          <h1 className="login-header">Log in to ImageSpace</h1>
          <form className="login-formmm" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li className="errorz" key={idx}>
                  {error}
                </li>
              ))}
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
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
