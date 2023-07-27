import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function NavBurger({ user }) {
  const history = useHistory();
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

  const pushImages = () => {
    history.push("/images");
    closeMenu();
  };
  const pushProfile = () => {
    history.push(`/user/${userz?.id}`);
    closeMenu();
  };

  const pushPrints = () => {
    history.push("/prints");
    closeMenu();
  };

  const pushPro = () => {
    history.push("/get-pro");
    closeMenu();
  };

  const ulClassName = "profile-dropdown2" + (showMenu ? " expanded" : "");

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <i className="fa fa-bars abs" onClick={openMenu}>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li className="over" onClick={() => pushProfile()}>
                You
              </li>
              <li className="over" onClick={() => pushImages()}>
                Explore
              </li>
              <li className="over" onClick={() => pushPrints()}>
                Prints
              </li>
              <li className="over" onClick={() => pushPro()}>
                Get Pro
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
      </i>
    </>
  );
}

export default NavBurger;
