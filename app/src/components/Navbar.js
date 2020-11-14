import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          background: "lightgrey",
        }}
      >
        <Link
          style={{ margin: "10px", textDecoration: "none", color: "black" }}
          to="/"
        >
          Home
        </Link>
        <Link
          style={{ margin: "10px", textDecoration: "none", color: "black" }}
          to="/login"
          onClick={() => {
            if (props.logSt) {
              props.setLogSt(false);
              window.localStorage.removeItem("token");
            }
          }}
        >
          {props.logSt ? "Logout" : "Login"}
        </Link>
        <Link
          style={{ margin: "10px", textDecoration: "none", color: "black" }}
          to="/protected"
        >
          Friends
        </Link>
      </header>
    </div>
  );
}

export default Navbar;
