import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import User from "./components/User";
import Admin from "./components/Admin";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/user" component={User} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;