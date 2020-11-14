import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./components/Login";
import Friends from "./protected/Friends";

function App() {
  const [logSt, setLogSt] = useState(false);

  return (
    <div className="App">
      <Navbar logSt={logSt} setLogSt={setLogSt} />
      <Route path="/login">
        <Login setLogSt={setLogSt} />
      </Route>
      <PrivateRoute exact path="/protected" component={Friends} />
      <Route
        exact
        path="/"
        render={() => <h1>Welcome to my Friends Site</h1>}
      />
    </div>
  );
}

export default App;
