import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const userz = useSelector((state) => state?.session?.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());

    history.push("/");
  };

  const profileHandler = () => {
    closeMenu();
    history.push(`/user/${userz?.id}`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-pic" onClick={openMenu}></button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>
              {" "}
              <i className="fas fa-hand-paper purps "></i>
              {user.username}
            </li>
            <li>
              <i className="fas fa-user purps "></i>
              {user.email}
            </li>
            <li>
              <i className="fas fa-camera purps "></i>
              <div onClick={profileHandler} className="profile-redirect">
                {" "}
                Your Profile
              </div>
            </li>
            <li className="not-you">
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
