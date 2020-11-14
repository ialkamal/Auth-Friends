import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./components/Login";
import Friends from "./protected/Friends";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route path="/login" component={Login} />
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
