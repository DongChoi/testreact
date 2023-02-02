import "./HomePage.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./userContext";

function Homepage() {
  const { currUser } = useContext(UserContext);
  return (
    <div className="welcome-msg">
      {currUser ? (
        <div>Welcome Back {currUser.username}!</div>
      ) : (
        <div>
          image time capsule, where you can forget memories for a while.
        </div>
      )}
    </div>
  );
}

export default Homepage;
