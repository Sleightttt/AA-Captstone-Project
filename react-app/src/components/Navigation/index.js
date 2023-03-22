import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const history = useHistory();

  const [search, setSearch] = useState("");

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          {!sessionUser ? (
            <ul className="nav-items">
              <li className="nav-left">
                <NavLink className={".nav-home"} exact to="/">
                  ImageSpace
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="nav-items">
              <li className="nav-left">
                <NavLink className={".nav-home"} exact to="/">
                  ImageSpace
                </NavLink>

                <div className="you">
                  <NavLink exact to="/profile">
                    You
                  </NavLink>
                </div>
                <div className="explore">
                  <NavLink exact to="/images">
                    Explore
                  </NavLink>
                </div>
                <div className="prints">
                  <NavLink exact to="/prints">
                    Prints
                  </NavLink>
                </div>
                <div className="get-pro">
                  {" "}
                  <NavLink exact to="/get-pro">
                    Get Pro
                  </NavLink>
                </div>
              </li>
              <div className="search-container">
                <div className="search-form">
                  <form
                    className="search-form"
                    onSubmit={() => history.push(`/search/${search}`)}
                  >
                    <input
                      placeholder="Photos, people, or groups"
                      className="search-form-input"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <i
                    onClick={(e) => setSearch(e.target.value)}
                    className="fas fa-search surch fa-lg"
                  ></i> */}
                  </form>
                </div>
              </div>
              {isLoaded && (
                <>
                  <div className="nav-right">
                    <div className="upload-icon">
                      <NavLink exact to="/images/new">
                        <i class="fa-solid fa-lg fas fa-upload"></i>
                      </NavLink>
                    </div>

                    <div className="cart-box">
                      <NavLink exact to="/shopping-cart">
                        <i className="cart-box  fas fa-bell fa-lg"></i>
                      </NavLink>
                    </div>
                    <div className="profile-box">
                      <ProfileButton user={sessionUser} />
                    </div>
                  </div>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Navigation;
