import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import NavBurger from "./NavBurger";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [search1, setSearch] = useState("");

  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          {!sessionUser ? (
            <ul className="nav-items">
              <li className="nav-left">
                <NavLink className={"nav-home"} exact to="/">
                  ImageSpace
                </NavLink>
                <img
                  alt="ImageSpace Logo"
                  className="logo"
                  src="/Images/ImageSpace_logo.jpg"
                ></img>
              </li>
            </ul>
          ) : (
            <ul className="nav-items">
              <li className="nav-left">
                <NavLink className={"nav-home"} exact to="/">
                  ImageSpace
                </NavLink>
                <img
                  alt="ImageSpace Logo"
                  className="logo"
                  src="/Images/ImageSpace_logo.jpg"
                  onClick={() => history.push("/")}
                ></img>
                <div className="nav-left-items">
                  <div className="you">
                    <NavLink exact to={`/user/${sessionUser.id}`}>
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
                </div>
                <div className="nav-left-items-smol">
                  <div className="profile-box2">
                    <NavBurger user={sessionUser} />
                  </div>
                </div>
              </li>
              <div className="search-container">
                <div className="search-form">
                  <form
                    className="search-form"
                    onSubmit={() => history.push(`/search/${search1}`)}
                  >
                    <input
                      placeholder="Photos, people, or groups"
                      className="search-form-input"
                      value={search1}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </form>
                </div>
              </div>
              {isLoaded && (
                <>
                  <div className="nav-right">
                    <div className="upload-icon">
                      <NavLink exact to="/images/new">
                        <i className="fa-solid fa-lg fas fa-upload"></i>
                      </NavLink>
                    </div>

                    <div
                      onClick={() => alert("Notifications coming soon")}
                      className="cart-box"
                    >
                      <i className="cart-box  fas fa-bell fa-lg white"></i>
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
