import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import Login from "./layouts/Login/Login.jsx";
import AdminPanel from "./layouts/AdminPanel/AdminPanel.jsx";

const customHistory = createBrowserHistory();

const type = localStorage.getItem("type"); //update when user logs in;

function CustomRoutes() {
  function routestoRender() {
    if (type === "WizMeAdmin") {
      return (
        <div>
          <Route exact path="/dashboard" component={AdminPanel} />
          <Route exact path="/addthemes" component={AdminPanel} />
          <Route exact path="/addavatars" component={AdminPanel} />
          <Route exact path="/addheaders" component={AdminPanel} />
          <Route exact path="/allitems" component={AdminPanel} />
          <Route exact path="/allusers" component={AdminPanel} />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <Router history={customHistory}>
      <Route exact path="/" component={Login} />
      {routestoRender()}
    </Router>
  );
}

export default CustomRoutes;
