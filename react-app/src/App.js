import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllImages from "./components/AllImages";
import NewImageForm from "./components/NewImageForm";
import SingleImage from "./components/SingleImage";
import UpdateImage from "./components/UpdateImage";
import Profile from "./components/Profile";
import Comments from "./components/Comments";
import About from "./components/About";
import Prints from "./components/Prints";
import GetPro from "./components/GetPro";
import Search from "./components/Search";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact={true} path="/">
            <LoginFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact={true} path="/images">
            <AllImages />
            <About />
          </Route>
          <Route exact={true} path="/search/:search">
            <Search />
            <About />
          </Route>
          <Route exact={true} path="/images/new">
            <NewImageForm />
            <About />
          </Route>
          <Route path="/images/:id/edit">
            <UpdateImage />
            <About />
          </Route>
          <Route exact={true} path="/images/:id">
            <SingleImage />
            <Comments />
            <About />
          </Route>
          <Route exact={true} path="/user/:id">
            <Profile />
            <About />
          </Route>
          <Route exact={true} path="/prints">
            <Prints />
            <About />
          </Route>
          <Route exact={true} path="/get-pro">
            <GetPro />
            <About />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
