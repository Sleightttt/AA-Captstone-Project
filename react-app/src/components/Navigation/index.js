import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";
//1.aws
//2.search
//3.make all links work
function Navigation({ isLoaded }) {
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [search, setSearch] = useState();
  const handleSearch = (e) => {
    e.preventDefault();
    alert("Search coming soon");
    setSearch("");
  };
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
                <NavLink className={".nav-home"} exact to="/">
                  ImageSpace
                </NavLink>
                <img
                  alt="ImageSpace Logo"
                  className="logo"
                  src="/Images/ImageSpace_logo.jpg"
                  onClick={() => history.push("/")}
                ></img>

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
                <div
                  // onClick={() => alert("Prints coming soon")}
                  className="prints"
                >
                  <NavLink exact to="/prints">
                    Prints
                  </NavLink>
                </div>
                <div
                  onClick={() => alert("Pro coming soon")}
                  className="get-pro"
                >
                  {" "}
                  {/* <NavLink exact to="/get-pro">
                    Get Pro
                  </NavLink> */}
                  Get Pro
                </div>
              </li>
              <div className="search-container">
                <div className="search-form">
                  <form
                    className="search-form"
                    // onSubmit={() => history.push(`/search/${search}`)}
                    onSubmit={handleSearch}
                  >
                    <input
                      placeholder="Photos, people, or groups"
                      className="search-form-input"
                      value={search}
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
                        <i className="fa-solid fa-lg fas fa-upload"></i>
                      </NavLink>
                    </div>

                    <div
                      onClick={() => alert("Notifications coming soon")}
                      className="cart-box"
                    >
                      {/* <NavLink exact to="/notifications"> */}
                      <i className="cart-box  fas fa-bell fa-lg white"></i>
                      {/* </NavLink> */}
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
