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
          </Route>
          <Route exact={true} path="/images/new">
            <NewImageForm />
          </Route>
          <Route path="/images/:id/edit">
            <UpdateImage />
          </Route>
          <Route exact={true} path="/images/:id">
            <SingleImage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
